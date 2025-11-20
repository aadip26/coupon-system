const express=require('express');
const app=express();
app.use(express.json());
const coupons=[];

app.post('/coupons', (req,res)=>{
  const c=req.body;
  if(coupons.find(x=>x.code===c.code)) return res.status(400).json({error:"Duplicate code"});
  coupons.push(c);
  res.json({message:"Coupon created", coupon:c});
});

function eligible(c,u,cart){
  const now=new Date();
  if(new Date(c.startDate)>now||new Date(c.endDate)<now) return false;
  const e=c.eligibility||{};
  if(e.allowedUserTiers && !e.allowedUserTiers.includes(u.userTier)) return false;
  if(e.minLifetimeSpend && u.lifetimeSpend<e.minLifetimeSpend) return false;
  if(e.minOrdersPlaced && u.ordersPlaced<e.minOrdersPlaced) return false;
  if(e.firstOrderOnly && u.ordersPlaced>0) return false;
  if(e.allowedCountries && !e.allowedCountries.includes(u.country)) return false;
  const cartValue=cart.items.reduce((s,i)=>s+i.unitPrice*i.quantity,0);
  if(e.minCartValue && cartValue<e.minCartValue) return false;
  if(e.applicableCategories){
    const ok=cart.items.some(i=>e.applicableCategories.includes(i.category));
    if(!ok) return false;
  }
  if(e.excludedCategories){
    const bad=cart.items.some(i=>e.excludedCategories.includes(i.category));
    if(bad) return false;
  }
  if(e.minItemsCount){
    const count=cart.items.reduce((s,i)=>s+i.quantity,0);
    if(count<e.minItemsCount) return false;
  }
  return true;
}

function discount(c,cart){
  const cartValue=cart.items.reduce((s,i)=>s+i.unitPrice*i.quantity,0);
  if(c.discountType==="FLAT") return c.discountValue;
  let d=cartValue*(c.discountValue/100);
  if(c.maxDiscountAmount) d=Math.min(d,c.maxDiscountAmount);
  return d;
}

app.post('/best-coupon',(req,res)=>{
  const {user,cart}=req.body;
  let best=null;
  for(const c of coupons){
    if(!eligible(c,user,cart)) continue;
    const d=discount(c,cart);
    if(!best || d>best.d || (d===best.d && new Date(c.endDate)<new Date(best.c.endDate)) ){
      best={c,d};
    }
  }
  res.json(best||null);
});

app.listen(3000,()=>console.log("Running on 3000"));