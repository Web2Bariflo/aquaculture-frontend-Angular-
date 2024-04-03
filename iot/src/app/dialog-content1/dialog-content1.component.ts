
import { Component,Inject } from '@angular/core';

import { DataSharingService } from '../data-sharing.service';
import { AuthenticationService } from '../authentication.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-content1',
  templateUrl: './dialog-content1.component.html',
  styleUrls: ['./dialog-content1.component.css']
})
export class DialogContent1Component {
  constructor(@Inject (MAT_DIALOG_DATA) public data:any, private auth:AuthenticationService,private dataSharingService: DataSharingService,private dialog:MatDialogRef<DialogContent1Component>){}

  graph_label=''
  graph_color=''
  graph_dis_name='';
  graph_allow_user= false;


  showListlabel:any[]=[]
  newlabel=''

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

 
  lineDetails:any;
   errorPop:any;
 errorMsg:any;
 graph_x:any;
 graph_y:any;

 selectedOptions: { graph_label: string, graph_color: string }[] = [];

   async onLineGraph(){

      if( this.graph_dis_name!== ''  && this.graph_x !== '' && this.graph_y !=='' ){

   
      this.lineDetails = {graph_dis_name: this.graph_dis_name, params:this.selectedOptions,type_name: this.data.type_name,type_ver: this.data.type_ver, graph_allow_user: this.graph_allow_user, x:this.graph_x,y:this.graph_y}
      
      try {
         console.log('line:',this.lineDetails)
      await this.auth.onDeviceLineGraph(this.lineDetails).subscribe(response=>
         {console.log(response)
         
         
            if(response.message === 'New Line graph created'){
                                      
               this.dialog.close();
           
               // Reload the page
               window.location.reload();
         }
         else{
            this.errorPop = response.message
         }
         
         }, error=>
         console.log(error))
   
      } catch (error) {
               // Handle errors here (e.g., show an error message)
               console.error('Error while adding control:', error);
             }
     
    }
    else{
      this.errorMsg = '*Please Enter all fields!'
   }
      }
      

 addOption(){
  this.selectedOptions.push({ graph_label: '', graph_color: '' });
 }
 removeOption(index: number) {
  this.selectedOptions.splice(index, 1);
}

}