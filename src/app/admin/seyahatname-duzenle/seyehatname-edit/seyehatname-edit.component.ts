import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QW } from '../../../_lib/qw.helper';
import { MySharedModules } from '../../../_com/myshared.module';

@Component({
  selector: 'app-seyehatname-edit',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './seyehatname-edit.component.html',
  styleUrl: './seyehatname-edit.component.scss'
})
export class SeyehatnameEditComponent {
  seyyahlar: any
  seyyahId: any;
  async submitForm(arg0: string) {

    if (arg0 == "update") {

      const fd = new URLSearchParams();
      fd.append('SeyahatnameKodu', this.editItem.SeyahatnameKodu);
      fd.append('Yazar', this.editItem.Yazar);
      fd.append('yuzyil', this.editItem.yuzyil);
      fd.append('Id', this.editItem.Id.toString());

      await QW.jsonPost("/seyahatname", fd);

    }
    else if (arg0 == "delete") {
      await QW.jsonPost("/seyahatname/delete/" + this.seyyahId);

    }
  }
  constructor(private route: ActivatedRoute) {


  }
  editItem: edititem = {
    Id: 0, SeyahatnameKodu: '', Yazar: '', yuzyil: ''
  };

  async ngOnInit() {
    this.seyyahId = this.route.snapshot.paramMap.get('id')
    if (this.seyyahId != "-1") {
      let user_2 = await QW.json("/seyahatname/" + this.seyyahId);
      this.editItem = user_2
    }
    let seyyahlar = await QW.json("/seyyahs");
    this.seyyahlar = seyyahlar.users;
  }
}
type edititem = {
  Id: number
  SeyahatnameKodu: string
  Yazar: string
  yuzyil: string


}