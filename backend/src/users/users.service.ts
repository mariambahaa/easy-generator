import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(email: string, name: string, password: string): Promise<UserDocument> {
    const existing = await this.userModel.findOne({ email }).lean();
    if (existing) throw new ConflictException('Email already in use');
    const passwordHash = await argon2.hash(password, { type: argon2.argon2id });
    const user = new this.userModel({ email, name, passwordHash });
    return user.save(); // returns a UserDocument
  }

  async findByEmailOrThrow(email: string): Promise<UserDocument> {
    const doc = await this.userModel.findOne({ email });
    if (!doc) throw new NotFoundException('User not found');
    return doc;
  }

  async validatePassword(user: UserDocument, password: string): Promise<boolean> {
    return argon2.verify(user.passwordHash, password);
  }

  sanitize(user: User | UserDocument) {
    const u = (user as any).toObject ? (user as any).toObject() : user;
    delete (u as any).passwordHash;
    return u;
  }
}
