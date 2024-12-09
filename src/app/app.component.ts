import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthGuard } from './_lib/auth.guard';
import { ThemeService } from './_lib/theme.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet],
    providers:[AuthGuard]
})
export class AppComponent {

    
}
