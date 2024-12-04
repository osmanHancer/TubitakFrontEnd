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

listAllMakale:[]=[];
listSelectedsMakale:any[]=[];
randomnumber:any

  async ngOnInit(): Promise<void> {
 
  const jsonSeyyahlarveSeyahatnameleri = await QW.json("/makale");

  this.listAllMakale = jsonSeyyahlarveSeyahatnameleri.makale;

  this.randomnumber=this.generateRandomNumbers(this.listAllMakale.length)

  this.randomnumber.forEach((element:number )=> this.listSelectedsMakale.push(this.listAllMakale[element]));

  console.log(this.listSelectedsMakale);

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
