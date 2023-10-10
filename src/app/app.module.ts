import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HashLocationStrategy, LocationStrategy } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ClientesComponent } from './components/clientes/clientes.component'
import { DescripcionComponent } from './components/descripcion/descripcion.component'
import { FormOneComponent } from './components/form-one/form-one.component'
import { FormTwoComponent } from './components/form-two/form-two.component'
import { TargetClientComponent } from './components/target-client/target-client.component'
import { SummaryStepsComponent } from './components/summary-steps/summary-steps.component'
import { LoadClientsComponent } from './components/load-clients/load-clients.component'
import { SpinnerComponent } from './components/spinner/spinner.component'
import { SpinnerInterceptor } from './components/spinner/spinner.interceptor'
import { MomentsComponent } from './components/buscador/moments.component';
import { StarsComponent } from './components/stars/stars.component';
import { SearchsPipe } from './pipes/searchs.pipe';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { GraphicsComponent } from './components/graphics/graphics.component'
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CreateAccountComponent } from './session/create-account/create-account.component';
import { LoginComponent } from './session/login/login.component';
import { InicioComponent } from './session/inicio/inicio.component';
import { TablasComponent } from './components/tablas/tablas.component';
import { ClientsList } from './directivas/clientesInfo';
import { ResumenClientesComponent } from './components/filtro/resumen-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    DescripcionComponent,
    FormOneComponent,
    FormTwoComponent,
    TargetClientComponent,
    SummaryStepsComponent,
    LoadClientsComponent,
    SpinnerComponent,
    MomentsComponent,
    StarsComponent,
    SearchsPipe,
    EditProfileComponent,
    GraphicsComponent,
    CreateAccountComponent,
    LoginComponent,
    InicioComponent,
    TablasComponent,
    ResumenClientesComponent
  ],
  imports: [
    // NgxChartsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ClientsList,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
