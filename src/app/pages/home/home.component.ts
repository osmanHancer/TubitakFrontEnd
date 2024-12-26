import { Component, ViewEncapsulation } from '@angular/core';
import { QW } from '../../_lib/qw.helper';
import { MySharedModules } from '../../_com/myshared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PageHomeComponent {

listAllMonografi:any[]=[];
homeTexts:any
listSelectedsMonografi:any[]=[];
randomnumber:any

  async ngOnInit() {
 
  const jsonYapiMonografisis = await QW.json("/yapimonografisi");
  const jsonhomeText = await QW.json("/editor");
  this.homeTexts=jsonhomeText.editor[0];


  this.listAllMonografi = jsonYapiMonografisis.data;

  this.randomnumber=this.generateRandomNumbers(this.listAllMonografi.length)

  this.randomnumber.forEach((element:number )=> this.listSelectedsMonografi.push(this.listAllMonografi[element]));


}
 generateRandomNumbers(limit: number): number[] {
  const randomNumbers: number[] = [];

  while (randomNumbers.length < 4) {
    const randomNumber = Math.floor(Math.random() * limit) + 0; // 1 ile limit arasında sayı üretir
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber); // Aynı sayıyı tekrar eklememek için kontrol
    }
  }

  return randomNumbers;
}
truncateText(text: string, limit: number): string {
  
  const div = document.createElement('div');
  div.innerHTML = text; // HTML içeriği temizlenir
  const plainText = div.innerText || div.textContent || ''; // Sadece düz metin alınır
  return plainText.length > limit ? plainText.substring(0, limit) + '...' : plainText;
}

}
