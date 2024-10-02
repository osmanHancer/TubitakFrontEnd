import { Component, OnInit } from '@angular/core';
import { QW } from '../../_lib/qw.helper';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  ngOnInit() {
    const form = document.querySelector('form');

    // Form submit olduğunda verileri okuma işlemi
    form?.addEventListener('submit', async (event) => {
      event.preventDefault(); // Sayfanın yeniden yüklenmesini engeller

      const nameValue = (document.getElementById("iletisim-name") as HTMLInputElement).value;
      const emailValue = (document.getElementById("iletisim-email") as HTMLInputElement).value;
      const messageValue = (document.getElementById("mesaj") as HTMLTextAreaElement).value;

      console.log('Ad Soyad:', nameValue);
      console.log('Email:', emailValue);
      console.log('Mesaj:', messageValue);

      const fd = new URLSearchParams();
      fd.append('subject', nameValue.toString())
      fd.append('mail', emailValue.toString())
      fd.append('text', messageValue.toString())
      await QW.jsonPost("/mail", fd);
      window.location.href = "/home/iletisim"; // İstediğiniz URL'ye yönlendirme yapar
    });
  }
}
