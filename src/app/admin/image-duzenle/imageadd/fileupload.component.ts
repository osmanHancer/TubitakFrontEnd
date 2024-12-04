import { Component } from '@angular/core';
import { MySharedModules } from '../../../_com/myshared.module';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { QW } from '../../../_lib/qw.helper';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent, NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fileupload',
  standalone: true,
  imports: [MySharedModules, NgxFileDropModule,NgSelectComponent,NgSelectModule,FormsModule],
  templateUrl: './fileupload.component.html',
  styleUrl: './fileupload.component.scss'
})
export class FileuploadComponent {
  dataSource: any;

  async ngOnInit() {
    const json = await QW.json("/lokasyon");
    this.dataSource = json.lokasyon;
  }


  public files: NgxFileDropEntry[] = [];
  editItem: galeri = { metin: "", lokasyonId: NaN };
  imgname: string = "";
  public dropped(files: NgxFileDropEntry[]) {
      this.files = files;  
  }
  public save(){
    
    for (const droppedFile of this.files) {

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(async (file: File) => {
          console.log(droppedFile.relativePath);
          this.imgname = droppedFile.relativePath.toString();

          const formData = new FormData()
          formData.append('file', file, droppedFile.relativePath)

        await  QW.jsonPost("/file/upload", formData);

        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
this.kaydet();

    }
  }
   fileOver(event: any) {
    console.log(event);
  }

   fileLeave(event: any) {
    console.log(event);
  }

 async kaydet(){

  const formData_2 = new URLSearchParams();
  formData_2.append('imgname', this.imgname)
  formData_2.append('metin', this.editItem.metin)
  formData_2.append('lokasyonId', this.editItem.lokasyonId.toString())
  await QW.jsonPost("/galeri", formData_2);
}

}
type galeri = {

  metin: string
  lokasyonId: number
}
