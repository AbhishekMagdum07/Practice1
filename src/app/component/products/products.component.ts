import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

import { BookService } from 'src/app/service/book.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  
  public productList : any ;
  public filterCategory : any
  searchKey:string ="";
  constructor(private api: ApiService, private cartService: CartService,
    private bookService: BookService) {
  
  }

  ngOnInit(): void {
    this.bookService.getBooks()
    .subscribe((res: any)=>{
      this.productList = res.data;
      this.filterCategory = res.data;
      console.log(this.productList)
    });

    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
  addtocart(item: any){
    this.cartService.addtoCart(item);
  }
  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }


}