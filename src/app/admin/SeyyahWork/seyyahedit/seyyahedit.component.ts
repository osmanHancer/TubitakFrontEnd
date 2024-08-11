import { Component } from '@angular/core';
import { MySharedModules } from '../../../_com/myshared.module';
import { MatTableDataSource } from '@angular/material/table';
import { QW } from '../../../_lib/qw.helper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seyyahedit',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './seyyahedit.component.html',
  styleUrl: './seyyahedit.component.scss'
})
export class SeyyaheditComponent {

  seyyahId: any;
  submitForm(arg0: string) {

    if (arg0 == "update") {

      const fd = new URLSearchParams();
      fd.append('name', this.editItem.name);
      fd.append('ozet', this.editItem.ozet);
      fd.append('id', this.editItem.id.toString());
      
        QW.jsonPost("/seyyahs", fd);
     
    }
    else if (arg0 == "delete"){
      QW.jsonPost("/seyyahs/delete/"+this.seyyahId);

    }
  }
  constructor(private route: ActivatedRoute) {


  }
  editItem: edititem = {
    id: 0, name: '',ozet:'',
  };

  async ngOnInit() {
    this.seyyahId = this.route.snapshot.paramMap.get('id')
    if (this.seyyahId != "-1") {
      let user_2 = await QW.json("/seyyahs/" + this.seyyahId);
      this.editItem = user_2.lokasyon;
    }

  }

}
type edititem = {
  id: number
  name: string
  ozet:string


}