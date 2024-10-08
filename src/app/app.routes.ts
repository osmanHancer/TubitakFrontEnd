import { Routes } from '@angular/router';
import { EditpointComponent } from './admin/PointWork/editpoint/editpoint.component';
import { Mapbox2Component } from './admin/mapbox-2/mapbox-2.component';
import { LokasyonEditComponent } from './admin/LokasyonWork/lokasyon/lokasyon-edit.component';
import { LokasyonComponent } from './admin/LokasyonWork/lokasyon-edit/lokasyon.component';
import { PointComponent } from './admin/PointWork/point/point.component';
import { SeyyahComponent } from './admin/SeyyahWork/seyyah/seyyah.component';
import { SeyyaheditComponent } from './admin/SeyyahWork/seyyahedit/seyyahedit.component';
import { YapilarComponent } from './admin/yapilar/yapilar.component';
import { LayoutAdminComponent } from './_layoutadmin/layoutadmin.component';
import { LayoutHomeComponent } from './_layouthome/layouthome.component';
import { YapiComponent } from './pages/yapı/yapi.component';
import { PageMakaleComponent } from './pages/pageMakale/makale.component';
import { FileuploadComponent } from './admin/imagework/imageadd/fileupload.component';
import { SahacalismasiComponent } from './admin/sahacalismasi/sahacalismasi/sahacalismasi.component';
import { SahacalismasieditComponent } from './admin/sahacalismasi/sahacalismasiedit/sahacalismasiedit.component';
import { EditorComponent } from './admin/editorwork/editor/editor.component';
import { EditorEditComponent } from './admin/editorwork/editor-edit/editor-edit.component';
import { AdimlarEditComponent } from './admin/adimlarwork/adimlar-edit/adimlar-edit.component';
import { AdimlarComponent } from './admin/adimlarwork/adimlar/adimlar.component';
import { MakaleComponent } from './admin/makale/makale/makale.component';
import { MakaleEditComponent } from './admin/makale/makale-edit/makale-edit.component';
import { KutuphaneComponent } from './pages/kutuphane/kutuphane.component';
import { DenemeComponent } from './admin/deneme/deneme.component';
import { SeyehatnameComponent } from './admin/seyahatname-work/seyehatname/seyehatname.component';
import { SeyehatnameEditComponent } from './admin/seyahatname-work/seyehatname-edit/seyehatname-edit.component';
import { MapboxComponent } from './pages/mapbox/mapbox.component';
import { ProjectteamComponent } from './pages/projectteam/projectteam.component';
import { HakkindaComponent } from './pages/hakkinda/hakkinda.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DetayliaramaComponent } from './pages/detayliarama/detayliarama.component';
import { ImagelistComponent } from './admin/imagework/imagelist/imagelist.component';
import { AuthComponent } from './admin/auth/auth.component';
import { AuthGuard } from './_lib/auth.guard';

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
            { path: '', redirectTo: 'auth', pathMatch: 'full' },

           
            {
                path: "seyahatname",
                component: SeyehatnameComponent,
                

            },
            {
                path: "seyahatname/:id",
                component: SeyehatnameEditComponent

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
                path: "editsaha/:sahaismi",
                component: SahacalismasieditComponent

            },
            {
                path: "editpoint/:seyyahnameKodu/:id",
                component: EditpointComponent

            },
            {
                path: "mapbox2",
                component: Mapbox2Component,

            },
            {
                path: "lokasyon",
                component: LokasyonEditComponent

            },
            {
                path: "lokasyonedit/:gunumuzdeki_adi",
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
                path: "yapılar",
                component: YapilarComponent

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
            { path: '', redirectTo: 'home', pathMatch: 'full' },
        ],

    },

];
