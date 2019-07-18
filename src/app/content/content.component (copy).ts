import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http'

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
	constructor (private httpService: HttpClient) { }
  	public arrProducts: string [];
    public rowsOnPage: number = 18;
    public selected_count: number = 0;
    public rowsOnPageSet = [18, 36, 54, 100, 500];

	// Filter  	
    public retailerS: any;
    public countryS: any;
    public brandS: any;
    
  	public arrRetailers        	  : Array<any>;
  	public arrState_Province   	  : Array<any>;
  	public arrCountry          	  : string [];
  	public arrPostalCode       	  : Array<any>;
   	public arrStoreName        	  : Array<any>;
	  public arrStoreNo          	  : Array<any>;
	  public arrProductHierarch1 	  : Array<any>;
  	public arrProductHierarch2 	  : Array<any>;
	  public arrProductHierarch3 	  : Array<any>;
	  public arrBrand				        : string [];
	  public arrUnitPrice           : Array<any>;
	  public arrSpecialOrderStatus	: Array<any>;

	  flMinPrice				: number;
	  flMaxPrice				: number;
	// Filter

	//Sorting
  	key: string = 'Date Online'; //set default
  	reverse: boolean = false;
  	sort(key){
  		this.p=1;
  		this.reverse = false;
  		if(key==1){
  			this.reverse = false;
  		}
		if(key==-1){
  			this.reverse = true;
  		}
    	this.key = 'Unit Price';
  	}
	//Sorting
 
  	p: number = 1;
  	ngOnInit () {
      this.selected_count =0;
    	this.httpService.get('../assets/data/Sample6.json').subscribe(
      //this.httpService.get('../assets/js/sample.json').subscribe(
      	data => {
          this.arrProducts = data['Sheet1'] as string []; // FILL THE ARRAY WITH DATA.
          //this.arrProducts = data as string []; // FILL THE ARRAY WITH DATA.
      		var arr_Retailers 			= [];
      		var arr_State_Province		= [];
      		var arr_Country 			= [];
      		var	arr_PostalCode       	= [];
  		    var arr_StoreName        	= [];
    	    var	arr_StoreNo          	= [];
			    var	arr_ProductHierarch1 	= [];
  			  var	arr_ProductHierarch2 	= [];
			    var	arr_ProductHierarch3 	= [];
			    var	arr_Brand				= [];
			    var	arr_UnitPrice			= [];
			    var	arr_SpecialOrderStatus	= [];

      		for (var key in this.arrProducts) {
      			
      			if(this.arrProducts[key]['Retailer']){
      				arr_Retailers.push(this.arrProducts[key]['Retailer']);
      			}
      			if(this.arrProducts[key]['State/Province']){
      				arr_State_Province.push(this.arrProducts[key]['State/Province']);
      			}		
      			if(this.arrProducts[key]['Country']){	
      				arr_Country.push(this.arrProducts[key]['Country']);
      			}		
      			if(this.arrProducts[key]['Postal Code']){	
      				arr_PostalCode.push(this.arrProducts[key]['Postal Code']);
      			}		
      			if(this.arrProducts[key]['Store Name']){	
      				arr_StoreName.push(this.arrProducts[key]['Store Name']);
      			}	
      			if(this.arrProducts[key]['Store No.']){	
      				arr_StoreNo.push(this.arrProducts[key]['Store No.']);
      			}		
      			if(this.arrProducts[key]['Product Hierarch1']){	
      				arr_ProductHierarch1.push(this.arrProducts[key]['Product Hierarch1']);
      			}		
      			if(this.arrProducts[key]['Product Hierarch2']){	
      				arr_ProductHierarch2.push(this.arrProducts[key]['Product Hierarch2']);
      			}		
      			if(this.arrProducts[key]['Product Hierarch3']){	
      				arr_ProductHierarch3.push(this.arrProducts[key]['Product Hierarch3']);
      			}		
				    if(this.arrProducts[key]['Brand']){      				
      				arr_Brand.push(this.arrProducts[key]['Brand']);
      			}	
      			if(this.arrProducts[key]['Unit Price']){
              if($.trim(this.arrProducts[key]['Unit Price'])!=''){
                arr_UnitPrice.push(parseFloat(this.arrProducts[key]['Unit Price']));
              }
              this.arrProducts[key]['Unit Price']=parseFloat(this.arrProducts[key]['Unit Price']);
      			}
      			if(this.arrProducts[key]['Special Order Status']){
      				arr_SpecialOrderStatus.push(this.arrProducts[key]['Special Order Status']);
      			}	
			    }

          this.arrRetailers 			= this.removeDuplicates(arr_Retailers);
          //State
    			arr_State_Province      = this.removeDuplicates(arr_State_Province);
    			var arrTmpState_Province=[];
    			for (var key in arr_State_Province) {
    				arrTmpState_Province.push({value:arr_State_Province[key],checked:false});
    			}
    			this.arrState_Province      = arrTmpState_Province;
          //State
          
          this.arrCountry             = this.removeDuplicates(arr_Country);
          //Postal Code
          arr_PostalCode 			    = this.removeDuplicates(arr_PostalCode);
          var arrTmpPostalCode=[];
          for (var key in arr_PostalCode) {
            arrTmpPostalCode.push({value:arr_PostalCode[key],checked:false});
          }
          this.arrPostalCode          = arrTmpPostalCode;
          //Postal Code
          //Store Name
    			arr_StoreName        	  = this.removeDuplicates(arr_StoreName);
          var arrTmpStoreName=[];
          for (var key in arr_StoreName) {
            arrTmpStoreName.push({value:arr_StoreName[key],checked:false});
          }
          this.arrStoreName           = arrTmpStoreName;
          //Store Name
          //Store No
    			arr_StoreNo          	  = this.removeDuplicates(arr_StoreNo);
          var arrTmpStoreNo=[];
          for (var key in arr_StoreNo) {
            arrTmpStoreNo.push({value:arr_StoreNo[key],checked:false});
          }
          this.arrStoreNo           = arrTmpStoreNo;
          //Store No
          
          //Product Hierarch1
          arr_ProductHierarch1=this.removeDuplicates(arr_ProductHierarch1);
          var arrTmpProductHierarch1 =[];
          for (var key in arr_ProductHierarch1) {
            arrTmpProductHierarch1.push({value:arr_ProductHierarch1[key],checked:false});
          }
    			this.arrProductHierarch1 	= arrTmpProductHierarch1;
          //Product Hierarch1

          //Product Hierarch2
          arr_ProductHierarch2=this.removeDuplicates(arr_ProductHierarch2);
          var arrTmpProductHierarch2 =[];
          for (var key in arr_ProductHierarch2) {
            arrTmpProductHierarch2.push({value:arr_ProductHierarch2[key],checked:false});
          }
          this.arrProductHierarch2  = arrTmpProductHierarch2;
          //Product Hierarch2

          //Product Hierarch3
    			arr_ProductHierarch3=this.removeDuplicates(arr_ProductHierarch3);
          var arrTmpProductHierarch3 =[];
          for (var key in arr_ProductHierarch3) {
            arrTmpProductHierarch3.push({value:arr_ProductHierarch3[key],checked:false});
          }
          this.arrProductHierarch3  = arrTmpProductHierarch3;
          //Product Hierarch3

    			this.arrBrand				= this.removeDuplicates(arr_Brand);

          //Product Unit Price
          arr_UnitPrice	  = this.removeDuplicates(arr_UnitPrice);
          //console.log(arr_UnitPrice);
          this.flMaxPrice = Math.max.apply(null, arr_UnitPrice);
    			this.flMinPrice = Math.min.apply(null, arr_UnitPrice);
          console.log(this.flMaxPrice);
          console.log(this.flMinPrice);
          var arrUnitPrice=[];
          var min_price=this.flMinPrice;
          while(this.flMinPrice<=this.flMaxPrice){ 
            var fl_price1=min_price;
            var fl_price2=min_price+5;
            arrUnitPrice.push({value:fl_price1+'-'+fl_price2,checked:false});
            if(fl_price2>=this.flMaxPrice){
                break;
            }
            min_price=min_price+5;
          }
          this.arrUnitPrice=arrUnitPrice;
          
          //Product Unit Price      
          //Product Special Order Status
          arr_SpecialOrderStatus=this.removeDuplicates(arr_SpecialOrderStatus);
          var arrTmpSpecialOrderStatus =[];
          for (var key in arr_SpecialOrderStatus) {
            arrTmpSpecialOrderStatus.push({value:arr_SpecialOrderStatus[key],checked:false});
          }
          this.arrSpecialOrderStatus  = arrTmpSpecialOrderStatus;
          //Product Special Order Status
			  },
      	(err: HttpErrorResponse) => {
	        console.log (err.message);
    	  }
    	);
  	}
    public removeDuplicates(arr){
    	let unique_array = [];
    	for(let i = 0;i < arr.length; i++){
	    	if(unique_array.indexOf(arr[i]) == -1){
            	unique_array.push(arr[i])
        	}
   		}
    	return unique_array;
    }
    // Clearing All Filter Criteria
    public clearFilter(field,value) {
      if(field=="Retailer"){
        if(this.retailerS){
          this.retailerS='';
        }
        this.retailers();
      }
      if(field=="state"){
        this.arrState_Province=this.arrState_Province.filter(item => { 
              if(item.value==value){
                item.checked=false; 
              } 
              return true;
          });
        this.state_province();
      }

      if(field=="Country"){
        this.countryS='';
        this.countries();
      }

      if(field=="zip"){
        this.arrPostalCode=this.arrPostalCode.filter(item => {
          if(item.value==value){
            item.checked=false; 
          } 
          return true;
        });
        this.postal_code();
      }

      if(field=="store"){
        this.arrStoreName=this.arrStoreName.filter(item => { 
          if(item.value==value){
            item.checked=false; 
          } 
          return true;
        });
        this.store_name();
      } 

      if(field=="no"){
        this.arrStoreNo=this.arrStoreNo.filter(item => { 
          if(item.value==value){
            item.checked=false; 
          } 
          return true;
        });
        this.store_no();
      }  

      if(field=="hierarch1"){
        this.arrProductHierarch1=this.arrProductHierarch1.filter(item => { 
          if(item.value==value){
            item.checked=false; 
          } 
          return true;
        });
        this.hierarch1();
      } 

      if(field=="hierarch2"){
        this.arrProductHierarch2=this.arrProductHierarch2.filter(item => { 
          if(item.value==value){
            item.checked=false; 
          } 
          return true;
        });
        this.hierarch2();
      }  

      if(field=="hierarch3"){
        this.arrProductHierarch3=this.arrProductHierarch3.filter(item => { 
          if(item.value==value){
            item.checked=false; 
          } 
          return true;
        });
        this.hierarch3();
      }  

      if(field=="Brand"){
        this.brandS='';
        this.brands();
      }

      if(field=="price"){
        this.arrUnitPrice=this.arrUnitPrice.filter(item => { 
          if(item.value==value){
            item.checked=false; 
          } 
          return true;
        });
        this.price();
      }  

      if(field=="status"){
        this.arrSpecialOrderStatus=this.arrSpecialOrderStatus.filter(item => { 
          if(item.value==value){
            item.checked=false; 
          } 
          return true;
        });
        this.status();
      }
    }

    // Clearing All Filter Criteria
    public clearFilterAll() {
      
      this.retailerS='';
      this.retailers();

      this.arrState_Province=this.arrState_Province.filter(item => { item.checked=false; return true;});
      this.state_province();

      this.countryS='';
      this.countries();

      this.arrPostalCode=this.arrPostalCode.filter(item => { item.checked=false; return true;});
      this.postal_code();

      this.arrStoreName=this.arrStoreName.filter(item => { item.checked=false; return true;});
      this.store_name();

      this.arrStoreNo=this.arrStoreNo.filter(item => { item.checked=false; return true;});
      this.store_no();

      this.arrProductHierarch1=this.arrProductHierarch1.filter(item => { item.checked=false; return true;});
      this.hierarch1();

      this.arrProductHierarch2=this.arrProductHierarch2.filter(item => { item.checked=false; return true;});
      this.hierarch2();

      this.arrProductHierarch3=this.arrProductHierarch3.filter(item => { item.checked=false; return true;});
      this.hierarch3();

      this.brandS='';
      this.brands();

      this.arrUnitPrice=this.arrUnitPrice.filter(item => { item.checked=false; return true;});
      this.price();

      this.arrSpecialOrderStatus=this.arrSpecialOrderStatus.filter(item => { item.checked=false; return true;});
      this.status();
    }
 
    //Retailer
    public retailers(){
      if(this.retailerS!=''){
        $('#selR,.selectedfilter').show();
      }else{
        $('#selR,.selectedfilter').hide();

      }
      this.clearYourSelectionText();
    }
    // State 
    public state_province() {
      if(this.arrState_Province){
        let selection=this.arrState_Province.filter(item => { return item.checked; })
        if(selection.length >0){
            $('.selectedfilter').show();
        }
        this.clearYourSelectionText();
        return selection;
      }
    }

    //Country
    public countries(){
      if(this.countryS!=''){
        $('#selC,.selectedfilter').show();
      }else{
        $('#selC,.selectedfilter').hide();

      }
      this.clearYourSelectionText();
    }
    
    // Zip Code
    public postal_code() {
      if(this.arrPostalCode){
        let selection=this.arrPostalCode.filter(item => { return item.checked; })
        if(selection.length >0){
            $('.selectedfilter').show();
          }
          this.clearYourSelectionText();
        return selection;
      }
    }

    // Store Name
    public store_name() {
        if(this.arrStoreName){
          let selection=this.arrStoreName.filter(item => { return item.checked; })
          if(selection.length >0){
            $('.selectedfilter').show();
          }
          this.clearYourSelectionText();
          return selection;
        }
    }

    // Store No
    public store_no() {
      if(this.arrStoreNo){
          let selection=this.arrStoreNo.filter(item => { return item.checked; })
          if(selection.length >0){
            $('.selectedfilter').show();
          }
          this.clearYourSelectionText();
          return selection;

      }
    }

    // Product Hierach1
    public hierarch1() {
      if(this.arrProductHierarch1){
        let selection=this.arrProductHierarch1.filter(item => { return item.checked; })
        if(selection.length >0){
            $('.selectedfilter').show();
        }
        this.clearYourSelectionText();
        return selection;
      }
    }

    // Product Hierach2
    public hierarch2() {
      if(this.arrProductHierarch2){
        let selection=this.arrProductHierarch2.filter(item => { return item.checked; })
        if(selection.length >0){
            $('.selectedfilter').show();
        }
        this.clearYourSelectionText();
        return selection;
      }
    }

    // Product Hierach3
    public hierarch3() {
      if(this.arrProductHierarch3){
        let selection=this.arrProductHierarch3.filter(item => { return item.checked; })
        if(selection.length >0){
            $('.selectedfilter').show();
        }
        this.clearYourSelectionText();
        return selection;
      }
    }

    // Product Unit Price
    public price() {
      if(this.arrUnitPrice){
        let selection=this.arrUnitPrice.filter(item => { return item.checked; })
        if(selection.length >0){
            $('.selectedfilter').show();
        }
        this.clearYourSelectionText();
        return selection;
      }
    }

    //Brand
    public brands(){
      if(this.brandS!=''){
        $('#selB,.selectedfilter').show();
      }else{
        $('#selB,.selectedfilter').hide();

      }
      this.clearYourSelectionText();
    }
    //Brand

    // Product Special Order Status
    public status() {
      if(this.arrSpecialOrderStatus){
        let selection=this.arrSpecialOrderStatus.filter(item => { return item.checked; })
        if(selection.length >0){
            $('.selectedfilter').show();
        }
        this.clearYourSelectionText();
        return selection;
      }
    }

    private clearYourSelectionText(){
      if(!$('.selectedfilter').is(':hidden')){
          if($('.selectedfilter').find('.filter-content').length<=0){
            $(this).hide();   
          }
      }     
    }
}