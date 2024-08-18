import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Leads } from './schema/leads.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/users/schema/users.schema';

@Injectable()
export class LeadsService {
  constructor(
    @InjectModel(Leads.name) private leadsModel: Model<Leads>,
    @InjectModel(Users.name) private usersModel: Model<Users>,
  ) {}

  async create(createLeadDto: CreateLeadDto, id: string) {
    console.log(id);

    const user = await this.usersModel.findById(
      new mongoose.Types.ObjectId(id),
    );

    if (!user) {
      throw new UnauthorizedException('User not found Please re-login!');
    }

    return await this.leadsModel.create({
      ...createLeadDto,
      createdBy: id,
    });
  }

  async myLeads(id: string) {
    return await this.leadsModel.find({ createdBy: id });
  }

  async findAll() {
    return await this.leadsModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} lead`;
  }

  async update(id: string, updateLeadDto: UpdateLeadDto) {
    return await this.leadsModel.findByIdAndUpdate(id, updateLeadDto, {
      lean: true,
    });
  }

  async remove(id: string) {
    return await this.leadsModel.findByIdAndDelete(id);
  }
}
