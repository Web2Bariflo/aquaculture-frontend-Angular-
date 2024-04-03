import { Component,Inject } from '@angular/core';

import { DataSharingService } from '../data-sharing.service';
import { AuthenticationService } from '../authentication.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-device-graph',
  templateUrl: './device-graph.component.html',
  styleUrls: ['./device-graph.component.css']
})
export class DeviceGraphComponent {
  constructor(@Inject (MAT_DIALOG_DATA) public data:any, private auth:AuthenticationService,private dataSharingService: DataSharingService, private dialog:MatDialogRef<DeviceGraphComponent>){
  
    this.displayname= data.data.display_name ,
    this.allow_user = data.allow_user;
    const oldDisplayname = data.data.display_name ;
     this.graphDetails = {oldDisplayname};
     this.selectedOptions = data.data.params;
     this.graph_x = data.data.x;
     this.graph_y = data.data.y;
  }


  displayname='';
  allow_user= false;
  graphDetails:any;
  graph_x:any;
  graph_y:any;
  showListlabel:any[]=[]
  newlabel=''
  selectedOptions: { graph_label: string, graph_color: string }[] = [];
  // addforlabel(){
  //   this.ts.addforserviceLabel(this.newlabel)
  // }

  // deleteLabel(index:any){
  //   // this.ts.
  //   this.ts.deleteAddService(index)
  // }

  // ngOnInit():void{
  // this.showListlabel=this.ts.labelList
  // // if(this.labelvalue==='' &&this.labelcolor===''){
  // //   this.buttonlabel=true
  // //  }else{
  // //   this.buttonlabel=false
  // //   console.log("Naresh")
  // //  }
  // }

 

 
   async onLineGraph(){
      const lineDetails = {type_name: this.data.deviceDetails.type_name, type_ver: this.data.deviceDetails.type_ver, control_key: 'graph', 
      old_dis_name: this.graphDetails.oldDisplayname,new_dis_name: this.displayname,new_alwusr:this.allow_user,new_x:this.graph_x,new_y:this.graph_y,new_params:this.selectedOptions}
      

      try {
        console.log('graph',lineDetails);
         await this.auth.onGraphUpdate(lineDetails).subscribe(response=>
            {console.log(response)
            
                 
     if(response.message === 'Updated'){
                                      
      this.dialog.close();
  
      // Reload the page
      window.location.reload();
}
            
            },error=>
            console.log(error))
       

      } catch (error) {
               // Handle errors here (e.g., show an error message)
               console.error('Error while adding control:', error);
             }
     
     
     
    }

    removeButton(index:any){
      this.selectedOptions.splice(index,1);
    }

    addOption(){
      this.selectedOptions.push({graph_label:'', graph_color:''})
    }

}
