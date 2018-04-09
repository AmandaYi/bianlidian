import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { NativeServiceProvider } from '../../providers/native-service/native-service';
import { elementAt } from 'rxjs/operators';

/**
 * Generated class for the CreateAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "CreateAddressPage"
})
@Component({
  selector: 'page-create-address',
  templateUrl: 'create-address.html',
})
export class CreateAddressPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apiService: ApiServiceProvider,
    private nativeService: NativeServiceProvider,
    private renderer:Renderer
  ) {


  }

  // ���ܲ����û�ID
  // userId:number=parseInt(localStorage.getItem("userId"));

  // ���ܲ����û�ID
  ngOnInit() {
    this.userId = this.navParams.get("uId");
    // console.log(this.userId);
    // console.log(1111111111111111111111111);

  }


  // DOM����
  @ViewChild("userValue") userValue: ElementRef;
  @ViewChild("telValue") telValue: ElementRef;
  @ViewChild("detailsValue") detailsValue: ElementRef;
  @ViewChild("showToastBlock") toastBlock: ElementRef;
  clearText(kind) {
    // console.log(this.userValue.nativeElement.value  );
    switch (kind) {
      case "user":
        this.userValue.nativeElement.value = "";
        break;
      case "tel":
        this.telValue.nativeElement.value = "";
        break;
      case "details":
        this.detailsValue.nativeElement.value = "";
        break;
    }
  }
  // ҳ�������ϻ�ȡֵ
  ionViewDidLoad() {
    // this.username=this.userValue.nativeElement.value ;
    // this.phone=parseInt(this.telValue.nativeElement.value );
    // // console.log(this.phone);
    // this.addressDetail =this.detailsValue.nativeElement.value ;
  }

  // �ɹ����ӵ�ַ��ʾ�ɰ�����
  time:number=3;
  showToastBlock() {
    this.renderer.setElementStyle(this.toastBlock.nativeElement,"display","block");

   let timerOut = setTimeout(() => {
      
      this.renderer.setElementStyle(this.toastBlock.nativeElement,"display","none");
       clearTimeout(timerOut);

    },3000);
   
   let timerInter = setInterval(()=>{
      this.time -= 1; 
      if(this.time==0||this.time<0){
        clearTimeout(timerInter);
        // ������һ��
        this.navCtrl.pop();
      }
   },1000)
// this.toastBlock
  }
  // DOM����END


  /**
   * @name ���ӵ�ַ
   * @param    
   * �û�ID
   *  userId: number,
   * �ջ��˵�����
   *  username:string,
   *  �ջ��˵ĵ绰
      phone:number,
      �ĸ�ʡ�����ݿ����
      provinceNameCode:number,
        �ĸ��е����ݿ����
      cityNameCode:number,
        �ĸ��������ݿ����
      countyNameCode: number,
  
      �ĸ�ʡ������
      provinceName:string,
      �ĸ��е�����
      cityName:string,
      �ĸ���������
      countyName:string,
      ������Ҫ������ϸ�ĵ�ַ
      addressDetail:string,
      У��
      checkedDef:any
   * 
   * 
   * 
   * 
   * 
  ������һ����ַ
  */
  userId: number;

  username: string ;

  phone: number;

  provinceNameCode: number = 410000;

  cityNameCode: number = 410100;

  countyNameCode: number = 410105;


  provinceName: string ;

  cityName: string;

  countyName: string;

  addressDetail: string ;

  checkedDef: any = 0;
  createAddess() {
    this.time=3;
    this.apiService.addAddress(
      this.userId,

      this.username,

      this.phone,

      this.provinceNameCode,

      this.cityNameCode,

      this.countyNameCode,


      this.provinceName,

      this.cityName,

      this.countyName,

      this.addressDetail,

      this.checkedDef
    )

      .subscribe(
        (item) => {
          // console.log(item);
          if (item.status == 200) {

            this.showToastBlock();
          }
        })
     
      }
    }

  

    
      
 
