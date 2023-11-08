import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ChangePassword, SigninUserDto, SignupUserDto, UpdateUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db';
import { Repository } from 'typeorm';
import { Utilities } from 'src/utils/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly utils: Utilities
  ) { }
  
  async signup(signupUserDto: SignupUserDto) {
    const user = await this.userRepo.findOne({ where: { email: signupUserDto.email } })
    
    if (user) 
      throw new HttpException('this email already exists', HttpStatus.BAD_REQUEST)

    let newUser = this.userRepo.create(signupUserDto)
    newUser.password = await this.utils.hashedPassword(signupUserDto.password)
    newUser = await this.userRepo.save(newUser)
    const token = await this.utils.generateToken(newUser)

    return {...newUser, token}
  }

  async signin(singinUserDto: SigninUserDto) {
    const user = await this.userRepo.findOne({ where: { email: singinUserDto.email } })

    if (!user) 
      throw new HttpException('user or email not found', HttpStatus.BAD_REQUEST)

    const pas = await this.utils.compairPassword(singinUserDto.password, user.password)

    if (!pas)
      throw new HttpException('user or email not found', HttpStatus.BAD_REQUEST)

    const token = await this.utils.generateToken(user)

    return token
  }

  async changePassword(change: ChangePassword, req: Request) {
    const id = req['user_id']
    const pass = await this.utils.compairPassword(change.newPassword, change.oldPassword)

    if (!pass)
      throw new HttpException('Incorrect your old password', HttpStatus.BAD_REQUEST)

    const user = new User()
    user.id = id
    user.password = await this.utils.hashedPassword(change.newPassword)
    await this.userRepo.save(user)

    return {message: 'successfully changed'}
  }
  
  async getSelfInfo(req: Request) {
    return this.userRepo.findOne({ where: { id: req['user_id'] } })
  }

  async findAll() {
    return this.userRepo.find()
  }

  async findOne(id: number) {
    return this.userRepo.findOne({where: {id}})
  }

  async update(updateUserDto: UpdateUserDto, req: Request) {
    const id = req['user_id']

    const user = await this.userRepo.findOne({ where: { id } })
    if (!user)
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST)

    user.fullname = updateUserDto.fullname
    await this.userRepo.save(user)
    return user
  }

  async remove(id: number) {
    await this.userRepo.delete(id)
    return {message: 'successfully removed'}
  }
}
