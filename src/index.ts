import {
  CoreValues,
  Module,
  ModuleConstructor,
} from "@internal-staff-portal/backend-shared";
import { Router } from "express";

//options for the Wrapper
interface ModuleOptions {}

//the wrapper of the constructor
export default function ModuleWrapper(
  options?: ModuleOptions,
): ModuleConstructor {
  //the constructor
  return function (core: CoreValues): Module {
    //define module path
    const path = "/tasks";

    //create the router
    const tasksRouter = Router();

    //create the socket.io namespace
    const namespace = core.createNamespace(path);

    //the module code here
    tasksRouter.get("/test", core.auth.validateMiddleware, (req, res) => {
      res.send("test");
    });

    //return the actual module
    return {
      name: "tasks",
      path: path,
      router: tasksRouter,
    };
  };
}
