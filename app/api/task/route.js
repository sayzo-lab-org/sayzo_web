// export const runtime = 'nodejs';

// import { NextResponse } from 'next/server';
// import { supabaseServer } from '@/lib/supabaseServer';

// export async function POST(req) {
//   try {
//     const data = await req.json();

//     const { error } = await supabaseServer
//       .from('tasks')
//       .insert([{
//         task_type: data.taskType,
//         task_name: data.taskName,
//         location: data.location || null,
//         description: data.description,
//         budget_type: data.budgetType,
//         amount: Number(data.amount),
//         duration: data.duration,
//         skills: data.skills,
//         experience: data.experience,
//       }]);

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
