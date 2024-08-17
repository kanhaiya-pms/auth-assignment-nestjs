import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Leads } from './schema/leads.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LeadsService {
  constructor(@InjectModel(Leads.name) private leadsModel: Model<Leads>) {}


  async create(createLeadDto: CreateLeadDto, id: string) {
    console.log(id);
    
    return await this.leadsModel.create({
      ...createLeadDto,
      createdBy: id
    });
  }

  async myLeads(id: string) {
    return await this.leadsModel.find({createdBy : id});
  }

  async findAll() {
    return await this.leadsModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} lead`;
  }

 async update(id: string, updateLeadDto: UpdateLeadDto) {
    return await this.leadsModel.findByIdAndUpdate(id,updateLeadDto);
  }

  async remove(id: string) {
    return await this.leadsModel.findByIdAndDelete(id);
  }
}
