import {Component, OnInit} from '@angular/core';
// import {TokenStorageService} from '../modules/auth/services/token-storage.service';
//
// declare var gapi: any;
//
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent /*implements OnInit*/{
//   ngOnInit(): void {
//       this.btnRender();
//   }
//   public btnRender(): void {
//     const options = {
//       scope: 'profile email',
//       width: 250,
//       height: 50,
//       longtitle: true,
//       theme: 'dark',
//       onsuccess: (googleUser => {
//         let profile = googleUser.getBasicProfile();
//         console.log('Token || ' + googleUser.getAuthResponse().id_token);
//         console.log('ID: ' + profile.getId());
//         console.log('Name: ' + profile.getName());
//         console.log('Image URL: ' + profile.getImageUrl());
//         console.log('Email: ' + profile.getEmail());
//         // your-code-goes-here
//       }),
//       onfailure: ((error) => {
//         console.log('failure', error);
//       })
//     };
//     gapi.signin2.render('googleBtn', options);
//   }
}
