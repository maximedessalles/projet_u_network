import { Component, OnInit, Inject } from '@angular/core';
import User from '../../models/User'
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../snackbar/snackbar.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/user.service';
declare const M: any;

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(public dialog: MatDialog, private modalService: NgbModal, private router: Router, private authService: AuthService, public _snackBar: MatSnackBar) { }

  ngOnInit() {

  }
  res: any;
  erreur = "";
  mdp: string = "";
  public user: User = {
    _id: "",
    email: "",
    password: "",
    name: "",
    firstName: "",
    civilite: "",
    isMailValid: false
  };
  openDialog() {
    this.dialog.open(ModalRGPD, {
      data: {
        user: this.user,
        dialog: this.dialog,
        mdp: this.mdp,

      }
    });
  }

  openDialogPasswordChange() {
    this.dialog.open(passwordChangeModal, {
      width: '600px',
      data: {
        user: this.user,
        res: this.res
      }
    });
  }

  public login(form: NgForm) {
    this.mdp = this.user.password;
    this.authService.login(form.value).subscribe(
      res => {
        if ('token' in res) {
          if (res["user"]["forcePasswordChange"]) {
            this.res = res["user"];
            this.openDialogPasswordChange();
          } else {
            if (res["user"]["isRGPDAcceptedLogin"]) {
              this.authService.setToken(res['token']);
              localStorage.setItem('user', JSON.stringify(res['user']));
              this.router.navigateByUrl('/');
              this._snackBar.openFromComponent(SnackBarComponent, {
                duration: 3000,
                verticalPosition: 'top',
                data: { msg: "Succès" }
              });
            } else {
              this.user = res["user"];
              this.openDialog();
            }
          }
        }
        localStorage.setItem('id', res._id);
      },
      err => {
        if ('error' in err) {
          this._snackBar.openFromComponent(SnackBarComponent, {
            duration: 3000,
            verticalPosition: 'top',
            data: { msg: 'Login ou mot de passe incorrect', error: true },
          });
        }
      }
    );
  }
}


@Component({
  selector: 'modal',
  templateUrl: 'modal.html',
})
export class ModalRGPD {
  erreur: string = "";
  user: User = {
    _id: "",
    email: "",
    password: "",
    name: "",
    firstName: "",
    civilite: "",
    isMailValid: false,
    isRGPDAcceptedLogin: false
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialog, private userService: UserService, private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }
  ngOnInit() {
    this.user = this.data["user"];
    this.user.password=undefined;

  }
  validerRGPD() {
    this.userService.updateUser(this.user, this.user._id).subscribe(res => {
      this.user.password = this.data["mdp"];
      this.erreur = "";

      this.authService.login(this.user).subscribe(
        res => {
          if ('token' in res) {


            this.authService.setToken(res['token']);
            localStorage.setItem('user', JSON.stringify(res['user']));
            this.router.navigateByUrl('/');
            this._snackBar.openFromComponent(SnackBarComponent, {
              duration: 3000,
              verticalPosition: 'top',
              data: { msg: "Succès" }
            });




          }

          localStorage.setItem('id', res._id);
        },
        err => {
          if ('error' in err) {
            this._snackBar.openFromComponent(SnackBarComponent, {
              duration: 3000,
              verticalPosition: 'top',
              data: { msg: 'Login ou mot de passe incorrect', error: true },
            });
          }
        }
      );
    },
      err => {
        this.erreur = "Impossible d'accepter le règlement'";
        console.error("erreur", err.message);
      });
  }
}








@Component({
  selector: 'passwordChangeModal',
  templateUrl: 'passwordChangeModal.html',
})
export class passwordChangeModal {
  erreur: string = "";
  password: string;
  passwordConf: string;
  user: User;
  result: Boolean = true;
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: MatDialog, private userService: UserService, private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }
  ngOnInit() {
    this.user = this.data["res"];
  }
  changementPassword() {
    this.erreur = "";
    if (!(this.password == this.passwordConf)) {
      this.erreur += "<li>Les mots de passe ne sont pas identique</li>";
      this.result = false;
    }
    if (!this.password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)/)) {
      this.erreur += "<li> Le mot de passe doit contenir 8 caractères , 1 chiffre et 1 caractère spécial</li>";
      this.result = false;
    }
    if (this.result) {
      this.user.password = this.password;
      this.user.forcePasswordChange = false;
      this.userService
        .updateUser(this.user, this.user._id)
        .subscribe(data =>this.erreur="", error => this.erreur = "Impossible de modifier le mdp");

      if (this.user.isRGPDAcceptedLogin) {
        console.log("userAjouté",this.user);
        this.authService.login(this.user).subscribe(
          res => {
            if ('token' in res) {
              this.authService.setToken((res["token"]));
              localStorage.setItem('user', JSON.stringify((this.user)));
              this.router.navigateByUrl('/');
              this._snackBar.openFromComponent(SnackBarComponent, {
                duration: 3000,
                verticalPosition: 'top',
                data: { msg: "Succès" }
              });
            }
            localStorage.setItem('id', this.user._id);
          },
          err => {
            if ('error' in err) {
              this._snackBar.openFromComponent(SnackBarComponent, {
                duration: 3000,
                verticalPosition: 'top',
                data: { msg: 'Login ou mot de passe incorrect', error: true },
              });
            }
          }
        );
      } else {
        this.openDialog();
      }

    }

  }

  openDialog() {
    this.dialog.open(ModalRGPD, {
      data: {
        user: this.user,
        dialog: this.dialog,
        mdp: this.password

      }
    });
  }
}
