import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("leads")
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post(":id")
  create(@Param("id") id: string, @Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto, id);
  }

  @Get('/my/:id')
  myLeads(@Param('id') id: string) {
    return this.leadsService.myLeads(id);
  }

  @Get()
  findAll() {
    return this.leadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadsService.update(id, updateLeadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadsService.remove(id);
  }
}
