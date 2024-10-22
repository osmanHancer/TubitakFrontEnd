import { Component } from '@angular/core';
import { MySharedModules } from '../_com/myshared.module';
@Component({
  selector: 'app-layoutadmin',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './layoutadmin.component.html',
  styleUrl: './layoutadmin.component.scss'
})
export class LayoutAdminComponent {
  title = 'Admin';
opened: boolean=true;
// onUpdateProfile() {
//   // Güncelleme ekranına yönlendirin
//   this.router.navigate(['/profile-update']);
// }

// onLogout() {
//   // Çıkış yapma işlemi
//   console.log('Çıkış yapıldı');
//   // Örneğin, token temizlenebilir ve login sayfasına yönlendirme yapılabilir
//   this.router.navigate(['/login']);
// }
}
