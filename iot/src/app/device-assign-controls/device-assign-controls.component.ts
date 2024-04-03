// import { Component } from '@angular/core';
// import { ThemePalette } from '@angular/material/core';
// import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { DialogContentComponent } from '../dialog-content/dialog-content.component';
// import { DialogContent1Component } from '../dialog-content1/dialog-content1.component';
// import { DialogContent2Component } from '../dialog-content2/dialog-content2.component';
// import { DialogContent3Component } from '../dialog-content3/dialog-content3.component';

// export interface Task {
//   name: string;
//   completed: boolean;
//   color: ThemePalette;
//   subtasks?: Task[];
// }


// @Component({
//   selector: 'app-device-assign-controls',
//   templateUrl: './device-assign-controls.component.html',
//   styleUrls: ['./device-assign-controls.component.css']
// })
// export class DeviceAssignControlsComponent {
//   events: string[] = [];
//   opened: boolean = false;
//   shouldRun: boolean = true;
//   accountId: string[] = [];
//   accountName: string[] = [];
//   admin:string[] = [];


//   constructor(private router: Router, public dialog : MatDialog ) {
//     // this.loginform-this.formBuilder.group
//   }


//   subMenuStates: { [key: string]: boolean } = {};

  
//   task: Task = {
//     name: 'Indeterminate',
//     completed: false,
//     color: 'primary',
    
//   };

  
//   /*openDialog6(): void {
//     const dialogRef = this.dialog.open(Edit4Component, {
//       width: '480px',
//       data: { accountId: this.accountId, accountName: this.accountName },
      
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed')
//       this.accountId = result;
//       this.accountName = result;
      
//     });
// */

// openDialog(): void {
//   const dialogRef = this.dialog.open(DialogContentComponent, {
//     width: '600px', // Set the desired width
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     console.log('Dialog closed:', result);
//   });
// }

// openDialog1(): void {
//   const dialogRef = this.dialog.open(DialogContent1Component, {
//     width: '700px', // Set the desired width
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     console.log('Dialog closed:', result);
//   });
// }

// openDialog2(): void {
//   const dialogRef = this.dialog.open(DialogContent2Component, {
//     width: '500px', // Set the desired width
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     console.log('Dialog closed:', result);
//   });
// }

// openDialog3(): void {
//   const dialogRef = this.dialog.open(DialogContent3Component, {
//     width: '500px', // Set the desired width
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     console.log('Dialog closed:', result);
//   });
// }

  
 

  


//   // ():void{
//   //   this.http.post("http://127.0.0.1:8000/admin",DialogData)
//   // }

  
  
 

//   toggleSubMenu(subMenuKey: string): void {
//     this.subMenuStates[subMenuKey] = !this.subMenuStates[subMenuKey];
//   }

//   isSubMenuOpen(subMenuKey: string): boolean {
//     return this.subMenuStates[subMenuKey] || false;
//   }




//   onLogout1():void{
//     this.router.navigate(['/login'])


//   }

//   onLogout():void{
//     this.router.navigate(['/login'])


//   }

// }



import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { DialogContent1Component } from '../dialog-content1/dialog-content1.component';
import { DialogContent2Component } from '../dialog-content2/dialog-content2.component';
import { DialogContent3Component } from '../dialog-content3/dialog-content3.component';
import { DataSharingService } from '../data-sharing.service';
import { DeleteAssignControlsComponent } from '../delete-assign-controls/delete-assign-controls.component';
import { AuthenticationService } from '../authentication.service';
import { DeviceButtonComponent } from '../device-button/device-button.component';
import { DeviceGraphComponent } from '../device-graph/device-graph.component';
import { DeviceSliderComponent } from '../device-slider/device-slider.component';
import { DeleteControlComponent } from '../delete-control/delete-control.component';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
type ButtonControlType = {
  display_name: string;
  virtual_pin: number;
  // Other properties specific to buttons
};

type SliderControlType = {
  display_name: string;
  virtual_pin: number;
  max_value: number;
  min_value: number;
  step_value: number;
  // Other properties specific to sliders
};

type GraphControlType = {
  display_name: string;
  label_name: string;
  label_color: string;
  // Other properties specific to sliders
};


// Define a type for items that can be either a button or a slider
type ItemType = {
  button?: ButtonControlType;
  slider?: SliderControlType;
  graph?: GraphControlType;
};


@Component({
  selector: 'app-device-assign-controls',
  templateUrl: './device-assign-controls.component.html',
  styleUrls: ['./device-assign-controls.component.css']
})
export class DeviceAssignControlsComponent implements OnInit {
  events: string[] = [];
  opened: boolean = true;
  shouldRun: boolean = true;
  accountId: string[] = [];
  accountName: string[] = [];
  admin:string[] = [];
  onofbutton:string="On Off Button"                                                                                                                                                                                                                                                                                                                        
  sliderInputbutton:string='Slider Input'
  showListcontrol:any[]=[]
  linebutton:string='Line Graph'
  labelbutton:string='Label'
  

   

  constructor(private router: Router, public dialog : MatDialog,private ts:DataSharingService, private dataSharingService:DataSharingService, private auth: AuthenticationService ) {
    // this.loginform-this.formBuilder.group
  }


  subMenuStates: { [key: string]: boolean } = {};

  
  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    
  };

  // Assuming your type definition for `item` looks something like this:



// openDialogEdit(Editcontrolvalue:any):void{
//   if(Editcontrolvalue==='Line Graph'){
//     const dialogRef = this.dialog.open(DialogContent1Component, {
//       width: '600px', // Set the desired width
//     });
  
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('Dialog closed:', result);
  
  
//     });

//   }else if(Editcontrolvalue==='Slider Input'){
//     const dialogRef = this.dialog.open(DialogContentComponent, {
//       width: '600px', // Set the desired width
//     });
  
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('Dialog closed:', result);
  
  
//     });
//   }else if(Editcontrolvalue==='Label'){
//     const dialogRef = this.dialog.open(DialogContent2Component, {
//       width: '600px', // Set the desired width
//     });
  
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('Dialog closed:', result);
    
  
//     });
//   }else if(Editcontrolvalue==='On Off Button'){
//     const dialogRef = this.dialog.open(DialogContent3Component, {
//       width: '600px', // Set the desired width
//     });
  
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('Dialog closed:', result);
  
  
//     });
//   }






// }

// onofbuttonAdd(): void {

  
//   this.ts.addControlAssign(this.onofbutton)
  
// }
// sliderInputAdd(){
//   this.ts.addControlAssign(this.sliderInputbutton)
   
// }

// labelAdd(){
//   this.ts.addControlAssign(this.labelbutton)

// }

// linegraphAdd(){
//   this.ts.addControlAssign(this.linebutton)

// }
getKey(item: ItemType): 'button' | 'slider' | 'graph' | undefined {
  if (item.button) {
    return 'button';
  } else if (item.slider) {
    return 'slider';
  } 
  else if (item.graph) {
    return 'graph';
  } else {
    return undefined;
  }
}
// getKey(item: ItemType): 'button' | 'slider' | undefined {
//   return Object.keys(item)[0]; // Extract the first key of the object
// }


onofbuttonAdd(): void {
  
  const getDevice = this.dataSharingService.getDeviceType();
  if (getDevice === undefined){
    this.onrefreshDevice = localStorage.getItem('localDevice')
    this.deviceDetails = JSON.parse(this.onrefreshDevice);

  }
  else{
    this.deviceDetails = getDevice;
  }
  const dialogRef = this.dialog.open(DialogContent3Component, {
    width: '700px', // Set the desired width
    data: this.deviceDetails
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed:', result)
  });
}

sliderInputAdd(): void {
  const getDevice = this.dataSharingService.getDeviceType();
  if (getDevice === undefined){
    this.onrefreshDevice = localStorage.getItem('localDevice')
    this.deviceDetails = JSON.parse(this.onrefreshDevice);

  }
  else{
    this.deviceDetails = getDevice;
  }
  const dialogRef = this.dialog.open(DialogContentComponent, {
    width: '500px', // Set the desired width
    data: this.deviceDetails
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed:', result);
  });
}


linegraphAdd(): void {
  const getDevice = this.dataSharingService.getDeviceType();
  if (getDevice === undefined){
    this.onrefreshDevice = localStorage.getItem('localDevice')
    this.deviceDetails = JSON.parse(this.onrefreshDevice);

  }
  else{
    this.deviceDetails = getDevice;
  }
  const dialogRef = this.dialog.open(DialogContent1Component, {
    width: '700px', // Set the desired width
    data: this.deviceDetails

  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed:', result);
  });
}

saveconfigcontrol(){
  localStorage.setItem('controlList',JSON.stringify(this.showListcontrol))
}

onrefreshDevice:any;
deviceDetails:any;

onOffButton(data:any): void {

  const getDevice = this.dataSharingService.getDeviceType();
  if (getDevice === undefined){
    this.onrefreshDevice = localStorage.getItem('localDevice')
    this.deviceDetails = JSON.parse(this.onrefreshDevice);

  }
  else{
    this.deviceDetails = getDevice;
  }
  const dialogRef = this.dialog.open(DeviceButtonComponent, {
    width: '700px', // Set the desired width
    data: {data, deviceDetails:this.deviceDetails }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed:', result)
  });
}

onslider(data:any): void {
  
  const getDevice = this.dataSharingService.getDeviceType();
  if (getDevice === undefined){
    this.onrefreshDevice = localStorage.getItem('localDevice')
    this.deviceDetails = JSON.parse(this.onrefreshDevice);

  }
  else{
    this.deviceDetails = getDevice;
  }
  const dialogRef = this.dialog.open(DeviceSliderComponent, {
    width: '500px', // Set the desired width
    data: {data, deviceDetails: this.deviceDetails}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed:', result);
  });
}


onLinegraph(data:any): void {
  
  const getDevice = this.dataSharingService.getDeviceType();
  if (getDevice === undefined){
    this.onrefreshDevice = localStorage.getItem('localDevice')
    this.deviceDetails = JSON.parse(this.onrefreshDevice);

  }
  else{
    this.deviceDetails = getDevice;
  }
  const dialogRef = this.dialog.open(DeviceGraphComponent, {
    width: '700px', // Set the desired width
    data: {data, deviceDetails: this.deviceDetails}

  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed:', result);
  });
}



onDeleteControl(data:any){
  
  const getDevice = this.dataSharingService.getDeviceType();
  if (getDevice === undefined){
    this.onrefreshDevice = localStorage.getItem('localDevice')
    this.deviceDetails = JSON.parse(this.onrefreshDevice);

  }
  else{
    this.deviceDetails = getDevice;
  }
  const control_key = Object.keys(data)[0];
  const dialogRef = this.dialog.open(DeleteControlComponent, {
    width: '300px', // Set the desired width
    data:  {data:data[Object.keys(data)[0]], deviceDetails: this.deviceDetails, control_key}})

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed:', result)
  });
}
 

onDialogEdit(item:any){

  switch (Object.keys(item)[0]) {
    case 'button':
      this.onOffButton(item[Object.keys(item)[0]])
      
      break;
    case 'slider':
      this.onslider(item[Object.keys(item)[0]])
      break;
      case 'graph':
        this.onLinegraph(item[Object.keys(item)[0]])
      break;
    default:
      // Handle unknown types or provide a default action
      break;
  }

}





  // ():void{
  //   this.http.post("http://127.0.0.1:8000/admin",DialogData)
  // }

  
  
  onclickHome(){
    this.router.navigate(['./admin-users'])
  }

  toggleSubMenu(subMenuKey: string): void {
    this.subMenuStates[subMenuKey] = !this.subMenuStates[subMenuKey];
  }

  isSubMenuOpen(subMenuKey: string): boolean {
    return this.subMenuStates[subMenuKey] || false;
  }



  onLogout():void{
    window.location.href = 'http://aqua.bariflorobotics.com/login'

    localStorage.removeItem('token')
  }
  onLogout1():void{
    window.location.href = 'http://aqua.bariflorobotics.com/login'
    localStorage.removeItem('token')

  }
  
  userStoreData:any;
  userNameProfile:any;
  controlsData: ItemType[] = [];
  response:any;
  async ngOnInit(){
     
  this.userStoreData=localStorage.getItem('userData')
  const userDataObject = JSON.parse(this.userStoreData);
  this.userNameProfile=userDataObject.userName
    this.showListcontrol=this.ts.listcontrol
    const eachItem=this.ts.listcontrol
    console.log(eachItem)

        

       const storedControlList = localStorage.getItem('controlList');
       console.log(storedControlList)

    // if (storedControlList) {
    //   this.showListcontrol = JSON.parse(storedControlList);
    // } else {
    //   this.showListcontrol = this.ts.listcontrol; 
    // }
    const devicetype=   this.dataSharingService.getDeviceType()
    if (devicetype === undefined){
       this.response = localStorage.getItem('localDevice');
      const getDevice = JSON.parse(this.response)
     await this.auth.onAssignedControlsView(getDevice.type_name,getDevice.type_ver).subscribe(response=>
        {console.log(response), this.controlsData = response}, error=>
        console.log(error))
  
    }
    else{
     await this.auth.onAssignedControlsView(devicetype.type_name,devicetype.type_ver).subscribe(response=>
        {console.log(response), this.controlsData = response}, error=>
        console.log(error))
  
    }
    
  }

  // removecontrol(index:number){
  //   this.ts.deletecontrol(index)
  // }

  
  // removecontrol(index:number):void{
  //   const dialogRef = this.dialog.open(DeleteAssignControlsComponent,{
  //     width:'300px',
  //     data:index
  //   })
  
  //   dialogRef.afterClosed().subscribe(result=>{
  //     console.log("dialog is closed")
  //   })
      
  //  }


}


