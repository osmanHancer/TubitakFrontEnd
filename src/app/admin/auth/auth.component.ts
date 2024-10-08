import { Component } from '@angular/core';
import { MySharedModules } from '../../_com/myshared.module';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { QW } from '../../_lib/qw.helper';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  mail: any;
  password: any;
  errorMessage: any;

  constructor(private router: Router) {

  }
  async login(ngForm: NgForm) {
    if (ngForm.valid) {
      const fd = new URLSearchParams();
  
      fd.append('mail', this.mail);
      fd.append('password', this.password);
  
      try {
        // JSON post ile login isteğini yapıyoruz
        let token = await QW.jsonPost("/auth/login", fd);
  
        // Eğer token dönerse bunu localStorage veya QW token değişkeninde sakla
        localStorage.setItem('jwt_token', token.access_token);
        this.router.navigateByUrl('admin/point');
      } catch (error: any) {
        // Eğer hata alırsan hatayı yakala
        if (error && error.message) {
          this.errorMessage = "Hatalı Bilgi"; // Hata mesajını kullanıcıya göster
        } else {
          this.errorMessage = "Bilinmeyen bir hata oluştu";
        }
      }
  
    } else {
      // Eğer form valid değilse kullanıcıya uyarı göster
      this.errorMessage = "Bilgiler eksik";
    }
  }
  



}
