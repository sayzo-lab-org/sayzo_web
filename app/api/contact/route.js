// export const runtime = 'nodejs';

// import { NextResponse } from 'next/server';
// import { supabaseServer } from '@/lib/supabaseServer';

// export async function POST(req) {
//   try {
//     const body = await req.json();

//     const { error } = await supabaseServer
//       .from('contacts')
//       .insert([body]);

//     if (error) {
//       console.error(error);
//       return NextResponse.json({ message: error.message }, { status: 400 });
//     }

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ message: 'Server error' }, { status: 500 });
//   }
// }
