import { Component } from '@angular/core';
import { MySharedModules } from '../../../_com/myshared.module';
import { QW } from '../../../_lib/qw.helper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sahacalismasiedit',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './sahacalismasiedit.component.html',
  styleUrl: './sahacalismasiedit.component.scss'
})
export class SahacalismasieditComponent {



  sahaismi: any;
  dataSource: any;
  async submitForm(arg0: string) {

    if (arg0 == "update") {

      const fd = new URLSearchParams();
      fd.append('LokasyonId', this.editItem.LokasyonId.toString());
      fd.append('Sahaismi', this.editItem.Sahaismi);
      fd.append('id', this.editItem.id.toString());


      await QW.jsonPost("/sahacalismasi", fd);

    }
    else if (arg0 == "delete") {
      await QW.jsonPost("/sahacalismasi/delete/" + this.sahaismi);

    }
  }
  constructor(private route: ActivatedRoute) {


  }
  editItem: edititem = {
    LokasyonId: NaN, Sahaismi: '',id:0
  };

  async ngOnInit() {
    const json = await QW.json("/lokasyon");
    this.dataSource = json.lokasyon;

    
    this.sahaismi = this.route.snapshot.paramMap.get('sahaismi')
    if (this.sahaismi != '-1') {
      let user_2 = await QW.json("/sahacalismasi/" + this.sahaismi);
      this.editItem = user_2;

    }



  }
}

type edititem = {

  LokasyonId: number
  Sahaismi: string
  id:number


}