import {rawJobs} from "./rawJobs";
import { mapJob } from "@/app/utils/mapJob";

export const jobs = rawJobs.map(mapJob);
