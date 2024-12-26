import { Routes } from '@angular/router';
import { LayoutAdminComponent } from './_layoutadmin/layoutadmin.component';
import { LayoutHomeComponent } from './_layouthome/layouthome.component';
import { YapiComponent } from './pages/yapi/yapi.component';
import { PageMakaleComponent } from './pages/pageMakale/makale.component';
import { SahacalismasiComponent } from './admin/sahacalismasi/sahacalismasi/sahacalismasi.component';
import { SahacalismasieditComponent } from './admin/sahacalismasi/sahacalismasiedit/sahacalismasiedit.component';
import { MakaleComponent } from './admin/makale/makale/makale.component';
import { MakaleEditComponent } from './admin/makale/makale-edit/makale-edit.component';
import { KutuphaneComponent } from './pages/kutuphane/kutuphane.component';
import { DenemeComponent } from './admin/deneme/deneme.component';
import { MapboxComponent } from './pages/mapbox/mapbox.component';
import { ProjectteamComponent } from './pages/projectteam/projectteam.component';
import { HakkindaComponent } from './pages/hakkinda/hakkinda.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DetayliaramaComponent } from './pages/detayliarama/detayliarama.component';
import { AuthComponent } from './admin/auth/auth.component';
import { AuthGuard } from './_lib/auth.guard';
import { FileuploadComponent } from './admin/image-duzenle/imageadd/fileupload.component';
import { ImagelistComponent } from './admin/image-duzenle/imagelist/imagelist.component';
import { LokasyonComponent } from './admin/Lokasyon-duzenle/lokasyon-edit/lokasyon.component';
import { LokasyonEditComponent } from './admin/Lokasyon-duzenle/lokasyon/lokasyon-edit.component';
import { EditpointComponent } from './admin/nokta-duzenle/editpoint/editpoint.component';
import { PointComponent } from './admin/nokta-duzenle/point/point.component';
import { AdimlarEditComponent } from './admin/sahaAdimi-duzenle/adimlar-edit/adimlar-edit.component';
import { AdimlarComponent } from './admin/sahaAdimi-duzenle/adimlar/adimlar.component';
import { SeyehatnameEditComponent } from './admin/seyahatname-duzenle/seyehatname-edit/seyehatname-edit.component';
import { SeyehatnameComponent } from './admin/seyahatname-duzenle/seyehatname/seyehatname.component';
import { SeyyahComponent } from './admin/Seyyah-duzenle/seyyah/seyyah.component';
import { SeyyaheditComponent } from './admin/Seyyah-duzenle/seyyahedit/seyyahedit.component';
import { EditorEditComponent } from './admin/yapi-duzenle/editor-edit/editor-edit.component';
import { EditorComponent } from './admin/yapi-duzenle/editor/editor.component';
import { HomeComponent } from './admin/home/home.component';
import { ArazicalismasiListComponent } from './admin/arazicalismasi-duzenle/arazicalismasi-list/arazicalismasi-list.component';
import { ArazicalismasiEditComponent } from './admin/arazicalismasi-duzenle/arazicalismasi-edit/arazicalismasi-edit.component';
import { PageHomeComponent } from './pages/home/home.component';
import { LayoutHome2Component } from './layouthome2/layouthome2.component';
import { KaynakcaComponent } from './pages/kaynakca/kaynakca.component';
import { HomeEditorEditComponent } from './admin/homeEditor/home-editor-edit/home-editor-edit.component';

export const routes: Routes = [



    {
        path:"login",
        component:AuthComponent
    },
    {

        path: "admin",
        canActivate:[AuthGuard],
        component: LayoutAdminComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },

           
            {
                path: "seyahatname",
                component: SeyehatnameComponent,
                

            },
            {
                path: "home",
                component: HomeComponent,
                

            },
            {
                path: "arazicalismasi-list",
                component: ArazicalismasiListComponent,
                

            },
            {
                path: "arazicalismasi-edit/:EnvanterKodu",
                component: ArazicalismasiEditComponent,
                
            },
            {
                path: "seyahatname/:id",
                component: SeyehatnameEditComponent

            },
            {
                path: "homeEditor",
                component: HomeEditorEditComponent

            },
            {
                path: "adım/:id",
                component: AdimlarEditComponent

            },
            {
                path: "adım",
                component: AdimlarComponent

            },
            {
                path: "saha",
                component: SahacalismasiComponent

            },
            {
                path: "saha/:sahaismi",
                component: SahacalismasieditComponent

            },
            {
                path: "point/:seyyahnameKodu/:id",
                component: EditpointComponent

            },
           
            {
                path: "lokasyon",
                component: LokasyonEditComponent

            },
            {
                path: "lokasyon/:gunumuzdeki_adi",
                component: LokasyonComponent

            },
            {
                path: "point",
                component: PointComponent

            },
            {
                path: "seyyah",
                component: SeyyahComponent

            },
            {
                path: "seyyah/:id",
                component: SeyyaheditComponent

            },
            {
                path: "editor",
                component: EditorComponent

            },
            {
                path: "editor/:id",
                component: EditorEditComponent

            },
            
            {
                path: "imageadd",
                component: FileuploadComponent

            },
            {
                path: "imagelist",
                component: ImagelistComponent

            },
            {
                path: "makale",
                component: MakaleComponent

            },
            {
                path: "makale/:id",
                component: MakaleEditComponent

            },
            {
                path: "deneme",
                component: DenemeComponent

            },

        ]
    },

    {
        path: "home", component: LayoutHomeComponent,
        children: [
            {
                path: "monografi/:yapı",
                component: YapiComponent
            },
          
            {
                path: "makale/:makale",
                component: PageMakaleComponent
            },
            {
                path: "kütüphane",
                component: KutuphaneComponent,
                
            },
            {
                path: "", 
                component: KutuphaneComponent
            },
            {
                path: "detayli-arama",
                component: DetayliaramaComponent
            },
            {
                path: "proje-ekibi",
                component: ProjectteamComponent
            },
            {
                path: "proje-hakkinda",
                component: HakkindaComponent
            },
            {
                path: "iletisim",
                component: ContactComponent
            },
            {
                path: "mapbox",
                component: MapboxComponent
              },
              {
                path: "mapbox/:enlem/:boylam",
                component: MapboxComponent
              },
              {
                path: "kaynakca",
                component: KaynakcaComponent
              },
          
        ],

    },

    {
        path: "", component: LayoutHome2Component,
        children: [
           
            {
                path: '',
                component: PageHomeComponent
            },
           
          
        ],

    },

];
