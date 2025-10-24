// api/quote.js — Example serverless POST endpoint (Vercel)
export default async function handler(req,res){
 if(req.method!=='POST') return res.status(405).json({ok:false,error:'Method Not Allowed'});
 try{ const data=req.body||{}; console.log('RFQ received:', data); return res.status(200).json({ok:true}); }catch(e){ return res.status(500).json({ok:false,error:'Server error'}); }
}
