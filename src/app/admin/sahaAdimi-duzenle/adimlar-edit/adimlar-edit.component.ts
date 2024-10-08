import { Component } from '@angular/core';
import { MySharedModules } from '../../../_com/myshared.module';
import { QW } from '../../../_lib/qw.helper';
import { ActivatedRoute } from '@angular/router';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-adimlar-edit',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './adimlar-edit.component.html',
  styleUrl: './adimlar-edit.component.scss'
})
export class AdimlarEditComponent {
  dataSource: any;
  datasahacalismasi: any
  sahacalismasi: any

  editItemList: editItem[] = [
  ];
  gizle: any;
  adimlar: any;
  nextId: number = 0;
  constructor(private route: ActivatedRoute) {

  }
  async ngOnInit() {
    this.adimlar = this.route.snapshot.paramMap.get('id')
    if (this.adimlar != '-1') {
      this.sahacalismasi = this.adimlar
      let data = await QW.json("/saha-adimlari/" + this.adimlar);
      this.editItemList = data.data
      this.nextId = this.editItemList[this.editItemList.length - 1].adimNo;
    }

    const json = await QW.json("/lokasyon");
    this.dataSource = json.lokasyon;
    const jsonsaha = await QW.json("/sahacalismasi");
    this.datasahacalismasi = jsonsaha;
  }




  addRow() {
    this.editItemList.push({ adimNo: ++this.nextId, LokasyonId: 1, not: "", sahacalismasiadi: this.sahacalismasi });

  }
  async deleteRow(adimNo: number) {
    if (this.adimlar != '-1') {
      const fd = new URLSearchParams();
      fd.append('adimNo', adimNo.toString())
      fd.append('sahacalismasiadi', this.adimlar)
     await QW.jsonPost("/saha-adimlari/delete", fd);


    }
    this.nextId = this.nextId - 1;
    this.editItemList = this.editItemList.filter(user => user.adimNo !== adimNo);
  }
  save() {

    this.editItemList.forEach(async element => {
      const fd = new URLSearchParams();
      fd.append('sahacalismasiadi', element.sahacalismasiadi)
      fd.append('LokasyonId', element.LokasyonId.toString())
      fd.append('not', element.not)
      fd.append('adimNo', element.adimNo.toString())
      await QW.jsonPost("/saha-adimlari", fd);


    });
  }



  drop(event: CdkDragDrop<string[]>) {
    
    moveItemInArray(this.editItemList, event.previousIndex, event.currentIndex);
    this.updateAdimNo();
    

  }
  updateAdimNo() {
    this.editItemList.forEach((item, index) => {
        item.adimNo = index + 1;
    });
}

}


type editItem = {

  adimNo: number;
  LokasyonId: number;
  not: string;
  sahacalismasiadi: string
}
