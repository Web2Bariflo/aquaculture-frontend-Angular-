import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CardComponent } from './card/card/card.component';
import { Router } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { HttpClient } from '@angular/common/http';
import { Dialog } from '@angular/cdk/dialog';
import { DataSharingService } from '../data-sharing.service';
import { AuthenticationService } from '../authentication.service';
import { GeneralAccountCreateComponent } from '../general-account-create/general-account-create.component';
import { GeneralAccountEditComponent } from '../general-account-edit/general-account-edit.component';
import { GeneralAccountDeleteComponent } from '../general-account-delete/general-account-delete.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  events: string[] = [];
  opened: boolean = true;
  shouldRun: boolean = true;
  accountId: string[] = [];
  accountName: string[] = [];
  admin:string[] = [];


  constructor(public dialog: MatDialog, private router: Router,private http:HttpClient,private dataSharingService: DataSharingService, private auth: AuthenticationService) {
    // this.loginform-this.formBuilder.group
  }



 addaccount:any=[]

  openDialog(): void {
    
    const dialogRef = this.dialog.open(GeneralAccountCreateComponent, {
      width: '400px',

    });
    // dialogRef.afterOpened().subscribe(()=>{
    //   this.http.post("http://192.168.0.113:8000/admin",this.).subscribe(
    //     (res)=>{
    //             this.
    //     }
    //   )
    // })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      
    });
   
  }


  onDeleteAccount(accountid:any){
    const dialogRef = this.dialog.open(GeneralAccountDeleteComponent, {
      width: '400px',
      data:accountid
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      
    });

  }
  
  onLogout():void{
    this.router.navigate(['/login'])
    console.log("nn")

  }
  onLogout1():void{
    this.router.navigate(['/login'])
    console.log("nn")

  }
  



  openDialog1(data:any): void {
    const dialogRef = this.dialog.open(GeneralAccountEditComponent, {
      width: '400px',
      data:data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      
    });

    
    
  }

  subMenuStates: { [key: string]: boolean } = {};

  toggleSubMenu(subMenuKey: string): void {
    this.subMenuStates[subMenuKey] = !this.subMenuStates[subMenuKey];
  }

  isSubMenuOpen(subMenuKey: string): boolean {
    return this.subMenuStates[subMenuKey] || false;
  }

  onClick(accountid:any){
    this.router.navigate(['./action']);
    this.dataSharingService.sendLoginAccountId(accountid);
  localStorage.setItem('logaccountId', JSON.stringify(accountid))
  }
  
  getAccounts:any=[]
  permission= {usercreate: false,
    useredit: false,
    userdelete: false,
    userview: false,
    accountcreate: false,
    accountedit: false,
    accountdelete: false,
    accountview: false,
    devicecreate: false,
    deviceedit: false,
    deviceview: false,
    devicedelete: false,
    deviceinstruction: false,
    setting: false,
    userid: ''}
    userPermissions:any={}
    permissData:any =[]
    userStoreData:any;
  userNameProfile:any;


  pageSize: number = 10; // Number of items per page
  currentPage: number = 1; // Current page
  totalPages: number = 1; // Total number of pages



  ngOnInit(): void {
    // const savedlogmob = localStorage.getItem('logMob');

    this.userStoreData=localStorage.getItem('userData')
 
  // console.log(this.userStoreData)
  const userDataObject = JSON.parse(this.userStoreData);
    this.userNameProfile=userDataObject.userName
    console.log(this.userNameProfile)
  // if(undefined===this.receivedData){
  //   const userDataObject = JSON.parse(this.userStoreData);

  //   console.log(this.receivedData)
  // }

    if (this.userStoreData){
      // const getlogmob = JSON.parse(savedlogmob);
      const userDataObject = JSON.parse(this.userStoreData);

      const receivedData=userDataObject.mobileno
      console.log(this.permission.accountview)

      

        this.auth.onFetchpermissions(receivedData).subscribe(response =>
          { console.log(response),
         this.userPermissions = response,
         this.permissData=this.userPermissions.message,
         
         
         this.permission = {usercreate: this.permissData.user_create,
           useredit: this.permissData.user_edit,
           userdelete: this.permissData.user_delete,
           userview: this.permissData.user_view,
           accountcreate: this.permissData.account_create,
           accountedit: this.permissData.account_edit,
           accountdelete: this.permissData.account_delete,
           accountview: this.permissData.account_view,
           devicecreate: this.permissData.device_create,
           deviceedit: this.permissData.device_edit,
           deviceview: this.permissData.device_view,
           devicedelete: this.permissData.device_delete,
           deviceinstruction: this.permissData.deviceinstruction,
           setting: this.permissData.settings,
           userid: "0"
           },
       console.log(this.permission);
         
       if (this.permission.accountview === true){
        const mob_no= {mobileno: receivedData}
      this.auth.onGetAccounts(mob_no).subscribe(response=>
        {console.log(response),
          this.getAccounts = response
          this.totalPages = Math.ceil(this.getAccounts.items.length / this.pageSize);
        },
        error =>
        console.log(error))

      }
},
         error=>
         console.log(error))


      

    }

    else{
      const logmob = this.dataSharingService.loginGetMob();

      
      

        this.auth.onFetchpermissions(logmob).subscribe(response =>
          { console.log(response),
         this.userPermissions = response,
         this.permissData=this.userPermissions.message,
         
         
         this.permission = {usercreate: this.permissData.user_create,
           useredit: this.permissData.user_edit,
           userdelete: this.permissData.user_delete,
           userview: this.permissData.user_view,
           accountcreate: this.permissData.account_create,
           accountedit: this.permissData.account_edit,
           accountdelete: this.permissData.account_delete,
           accountview: this.permissData.account_view,
           devicecreate: this.permissData.device_create,
           deviceedit: this.permissData.device_edit,
           deviceview: this.permissData.device_view,
           devicedelete: this.permissData.device_delete,
           deviceinstruction: this.permissData.deviceinstruction,
           setting: this.permissData.settings,
           userid: "0"
           },
       console.log(this.permission);
       if (this.permission.accountview === true){
        const mob_no= {mobileno: logmob}
      this.auth.onGetAccounts(mob_no).subscribe(response=>
        {console.log(response),
          this.getAccounts = response
          this.totalPages = Math.ceil(this.getAccounts.items.length / this.pageSize);
        },
        error =>
        console.log(error))}
      },
         error=>
         console.log(error))


        
  
  



      }


    

  }
  setPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

  // Function to go to the next page
  nextPage() {
    this.setPage(this.currentPage + 1);
  }

  // Function to go to the previous page
  prevPage() {
    this.setPage(this.currentPage - 1);
  }
  getCurrentPageData(): any {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    if (this.getAccounts.items!== undefined){ return this.getAccounts.items.slice(startIndex, endIndex);}
   
  }
 
}

