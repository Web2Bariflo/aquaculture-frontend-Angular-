import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { UrlSegment } from '@angular/router';


@Injectable({
  providedIn: 'root'   
})
export class AuthenticationService {   
  constructor(private http: HttpClient) {}

  login(mobileno: string, password: string) {
    const body = { mobileno, password };
    console.log(body)
    return this.http.post<any>('http://20.244.48.88/login/', body); 
  }

  // 4.188.244.11

  onSubmitAddUser(userDetails:any){
    console.log(userDetails);
    return this.http.post<any>('http://20.244.48.88/user/',userDetails)
  }



  
  getData() {
    return this.http.get('http://20.244.48.88/admin_view/');
  }


  editUserData(userData:any){
    const userDetails = {mobileno: userData[1], newusername: userData[0], newuseremail: userData[3], usertype: userData[2]};

    return this.http.post<any>('http://20.244.48.88/user_edit/', userDetails)
  }


  onSubmitAccountCreate(accountData:any){
    console.log(accountData)
    return this.http.post<any>('http://20.244.48.88/account/',accountData)

  }
  

  onGetAccounts(mobno:any){
    console.log(mobno);
    return this.http.get(`http://20.244.48.88/account_view/${mobno.mobileno}/`,)
  }

  onEditAccounts(accounts:any){
    console.log(accounts);
    const accountBody = {accountid: accounts[1],newaccountname: accounts[0]};
    return this.http.post<any>('http://20.244.48.88/account_edit/',accountBody);
  }


  onAddNewDevice(deviceDetails:any){
    console.log(deviceDetails);
    return this.http.post<any>('http://20.244.48.88/device_create/',deviceDetails);
  }



  onFetchDevices(accountid:any){
    console.log(accountid);
    return this.http.get(`http://20.244.48.88/device_view/${accountid}/`);

  }

  onClickEditDevices(devicedetails:any){
    console.log(devicedetails)
    return this.http.post('http://20.244.48.88/device_edit/',devicedetails)
  }


DeleteUser(mobileno:any){
  const userDelete = {mobileno}
  return this.http.post<any>('http://20.244.48.88/user_delete/',userDelete)

}

DeleteAdmin(mobileno:any){
  const userDelete = {mobno:mobileno}
  return this.http.post<any>('http://20.244.48.88/admin_delete/',userDelete)

}
DeleteAccount(accountid:any){
  const deleteaccount= {accountid}
  return this.http.post<any>('http://20.244.48.88/account_delete/', deleteaccount)

}

onDeviceDelete(deviceid:any){
  const deletedevice = {deviceid}
  return this.http.post<any>('http://20.244.48.88/device_delete/', deletedevice)

}


onPermissionsCreate(permissions:any){
  console.log(permissions)
  return this.http.post<any>(`http://20.244.48.88/permission/${permissions.userid}/`,permissions)
}


onFetchpermissions(mobileno:any){

  return this.http.get(`http://20.244.48.88/permission/${mobileno}/`)
}


onPostDevices(devicetype:any){
  console.log(devicetype)
  return this.http.post<any>('http://20.244.48.88/devicetype_create/',devicetype)
}

onGetDeviceTypes(){
  return this.http.get('http://20.244.48.88/devicetype_view/')
}

onEditDeviceDetails(devicedetails:any){
  console.log(devicedetails)
  return this.http.post<any>('http://20.244.48.88/devicetype_edit/', devicedetails)
}

DeleteDevicetype(devicedelete:any){
  console.log(devicedelete)
  return this.http.post('http://20.244.48.88/devicetype_delete/', devicedelete)
}


onDeviceSlider(devicedetails:any){
  console.log(devicedetails)
  return this.http.post<any>('http://20.244.48.88/slider_control/', devicedetails)
}

onDeviceLineGraph(devicedetails:any){
  console.log(devicedetails)
  return this.http.post<any>('http://20.244.48.88/graph_control/', devicedetails)
}

onDeviceOnOff(buttondetails:any){
  console.log(buttondetails)
  return this.http.post<any>('http://20.244.48.88/on_off_control/', buttondetails)
}

onAssignedControlsView(type_name:any,type_ver:any){
console.log(type_name)
console.log(type_ver)
return this.http.get<any>(`http://20.244.48.88/controls_view/${type_name}/${type_ver}/`)
}


onGraphUpdate(graphDetails:any){
  console.log(graphDetails);
  return this.http.post<any>('http://20.244.48.88/graph_control_edit/', graphDetails)

}
onSliderUpdate(graphDetails:any){
  console.log(graphDetails);
  return this.http.post<any>('http://20.244.48.88/slider_control_edit/', graphDetails)

}

onButtonUpdate(graphDetails:any){
  console.log(graphDetails);
  return this.http.post<any>('http://20.244.48.88/on_off_control_edit/', graphDetails)

}

onDeleteControl(controlDetails:any){
  console.log(controlDetails)
  return this.http.post<any>('http://20.244.48.88/control_delete/', controlDetails)

}


onRegisterUser(userDetails:any){
  console.log(userDetails)
  return this.http.post<any>('http://20.244.48.88/registration/', userDetails)
}


onUserVerificationView(adminNumber:any){
  console.log(adminNumber)
  return this.http.get<any>(`http://20.244.48.88/register_view/${adminNumber}/`)
}


onSendBasicDetails(userDetails:any){
  console.log(userDetails);
  return this.http.post<any>(`http://20.244.48.88/user/`, userDetails)

}

onSendAccountDetails(accountDetails:any){
  console.log(accountDetails);
  return this.http.post<any>('http://20.244.48.88/account/', accountDetails)
}

addRegisterDevice(deviceDetails:any){
  console.log("devicedetails....................",deviceDetails);
  return this.http.post<any>('http://20.244.48.88/device_create/', deviceDetails)


}

onRegisterMail(registerDetails:any){
  const mobno = {mobno:registerDetails}
  console.log(mobno);
  return this.http.get<any>(`http://20.244.48.88/email_send/${mobno.mobno}/`)
}


onSuperAdminCreate(adminDetails:any){
  console.log(adminDetails);
  return this.http.post<any>('http://20.244.48.88/admincreate/', adminDetails)

}

onProfileDetailsAdd(profileDetails:any){
  console.log(profileDetails);
  return this.http.post<any>('http://20.244.48.88//', profileDetails)
}


onCreatedUserView(mobileno:any){
  console.log(mobileno);
  return this.http.get<any>(`http://20.244.48.88/user_view/${mobileno}/`)


}

onForgotPassword(mobno:any){
  const forgotEmail = {email:mobno}
console.log(forgotEmail)
return this.http.post<any>('http://20.244.48.88/email_verification/',forgotEmail)
}

onCheckOTP(email:any){
  console.log(email);
  const otpCode={email}
  return this.http.get<any>(`http://20.244.48.88/password_sent/${email}/`)

}

onTotalUsers(){
  return this.http.get<any>('http://20.244.48.88//');
}


onAdminUserAccounts(mobno:any){
  console.log(mobno);
  return this.http.get(`http://20.244.48.88/account_view/${mobno}/`,)
}

demoLogin(userDetails:any){
  console.log('log',userDetails)
  return this.http.post('http://20.244.48.88/log_in/',userDetails)
}

tokenCheck(token:any){
  console.log(token);
  return this.http.post<any>('http://20.244.48.88/token_verification/',token)
}
loggedIn(){
  const token=localStorage.getItem('token')
  console.log(`jwt token `+!!token)
  return !!token;
}







onThermalImage(imageDetails:any){
  console.log(imageDetails);
  return this.http.get<any>(`http://20.244.48.88/thermal_img/${imageDetails.mobileno}/${imageDetails.days}/`);
}



onOcrImage(imageData:any){
  console.log(imageData)
return this.http.post<any>('http://20.244.48.88/ocr/', imageData)
}


onOcrRequested(mobileno:any){
  console.log(mobileno);
  return this.http.get<any>(`http://20.244.48.88/admin_side_ocr_view/`)
}

onOcrAdminResponse(userMob:any){
  const mobileno = {mobno: userMob[2], imgname:userMob[0]}
  console.log(mobileno);
  return this.http.post<any>(`http://20.244.48.88/ocr_process/`, mobileno)
}


onLoginGeneralDashboard(account:any){
  console.log("Account clicked..",account);
  // return this.http.get(`http://20.244.48.88/userside_graph_view/${mobileno}/`)
  return this.http.get(`http://20.244.48.88/userside_graph_view/${account}/`)
}


onAllDevicesDetails(mobileno:any){
console.log(mobileno);
return this.http.get<any>(`http://20.244.48.88/userside_device_view/${mobileno}/`)
}


onAdmincreateuserpond(pondDetails:any){
  return this.http.post<any>('http://20.244.48.88/account/',pondDetails)
}

// accountClickedMessage(accountno:any){
//   console.log("account",accountno);
//   return this.http.get<any>(`http://20.244.48.88/account_view/${accountno}/`)
// }


accountClickedMessage(accountno:any){
  console.log("account",accountno);
  return this.http.get<any>(`http://20.244.48.88/userside_account_view/${accountno}/`)
}

onAllDeviceslist(user:any){
  console.log("username",user);
  return this.http.get<any>(`http://20.244.48.88/userside_device_view/${user}/`)
  }

}
  
