import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuillModule } from 'ngx-quill'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/header/header.component';
import { EditorComponent } from './components/editor/editor.component';
import { OutputComponent } from './components/output/output.component';
import { WarningComponent } from './components/warning/warning.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from './services/socket.service';

// const config: SocketIoConfig = { url: 'http://localhost:1337', options: {} };
const config: SocketIoConfig = { url: 'https://jsramverk-editor-jaka19.azurewebsites.net', options: {} };

@NgModule({
  
  declarations: [
    AppComponent,
    HeaderComponent,
    EditorComponent,
    OutputComponent,
    WarningComponent,
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    FontAwesomeModule,
    HttpClientModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [    
    SocketService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }