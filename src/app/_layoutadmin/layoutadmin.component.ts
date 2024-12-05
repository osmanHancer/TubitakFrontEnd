import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MySharedModules } from '../_com/myshared.module';
import { MediaMatcher } from '@angular/cdk/layout';
@Component({
  selector: 'app-layoutadmin',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './layoutadmin.component.html',
  styleUrl: './layoutadmin.component.scss'
})
export class LayoutAdminComponent {

  mobileQuery: MediaQueryList ;

  private _mobileQueryListener: () => void;

  constructor() {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
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
