# koa-router-decorator2
一个高效轻量级的基于koa 和koa-router 写的装饰器路由库

#### 示例1
> src/index.ts

```typescript
import {ResigerRouter} from "koa-router-decorator2";
import koaRouter from "koa-router";
import Koa from "koa"
import { setGolbalGuards, setGolbalMiddleware, UserController, Validation } from "./UserController";

const app = new Koa()
const rotuer = new koaRouter({
  prefix: "/api",
});


/**一个http服务请求的执行顺序
 *全局中间件--setGolbalMiddleware
  类中间件--ClassMiddleware
  方法中间件--MethondMiddleware
  全局守卫 useAuthGuards { useConfig: { userId: '1', userName: '123' } } 12
  类守卫 ClassGuards { useConfig: { userId: '1', userName: '123' } }
  方法守卫 MethondGuard { useConfig: { userId: '1', userName: '123' } } 这是元数据
  管道 Validation-apply: [ { value: { id: '12' }, type: [class useDto] } ]
  路由层:getbefore state: { useConfig: { userId: '1', userName: '123' } } query: { id: '12' }
 * 
 */


 // 注册控制器
  ResigerRouter(rotuer, UserController,{
    midwares:[setGolbalMiddleware], // 中间件
    guards:[setGolbalGuards], // 守卫
    pipes:[ new Validation() ] // 管道: 一般用与请求的参数默认设置，转换，验证
  });

  // 全局错误捕获处理
  const HttpExceptionFilter =  async (error:Error,ctx:Koa.DefaultContext)=>{
    ctx.body =  {message:error.message?error.message:error,status:false,success:false,path: ctx.url,}
  }

  //全局响应处理(可以省略)
  const HttpResponseInterceptor = async (ctx:Koa.DefaultContext)=>{
    if (ctx.response.is("text/plain") || ctx.response.is("json")) {

      ctx.body = await { timestamp: new Date(), code: 200, data: ctx.body, status: true, message: "success"};
    }
  }

  // 设置第一个中间，可以捕获全局响应和错误处理
  const firstMiddlWare = async (ctx:Koa.DefaultContext,next:Function)=>{
    try {
      await next();
      HttpResponseInterceptor(ctx) ;//响应处理
    } catch (error) {
      ctx.app.emit("error", error, ctx); // 错误处理
    }
  }

  app.use(firstMiddlWare)
  app.use(rotuer.routes()); // 使用路由中间
  app.listen( 8080,()=>{
    console.log("server is run in prot 8080")
  } )
  app.on("error", HttpExceptionFilter)



```

> src/UserController.ts

```typescript
// import {
//     Controller,
//     GET,
//     Query,
//     Ctx,
//     Guard,
//     Pipe,
//     IContextOption,
//     IGuard,
//     Use,
//     setMetadata,
//   } from "../../index";
  import {
    Controller,
    GET,
    Query,
    Ctx,
    Guard,
    Pipe,
    IContextOption,
    IGuard,
    Use,
    setMetadata,
    Cookie,
  } from "koa-router-decorator2";
  import Koa from "koa"
   import * as Cookies from 'cookies';

  // DTO
  class useDto{
    id:string="12"
    name:string="name"

  }
  // 中间件,设置全局 参数
  // const 
  export const setGolbalMiddleware = async(ctx:Koa.DefaultContext,next:Function)=>{
    console.log("全局中间件--setGolbalMiddleware")
    ctx.state.useConfig = {
       userId:"1",
       userName:"123"
    }
    // throw new Error("全局中间件--setGolbalMiddleware 错误")
    await next()
  }

  //类中间件--ClassMiddleware
  export const ClassMiddleware = async(ctx:Koa.DefaultContext,next:Function)=>{
    console.log("类中间件--ClassMiddleware")
    // throw new Error("类中间件--ClassMiddleware 错误")

    await next()
  }

  //方法中间件--MethondMiddleware
  export const MethondMiddleware = async(ctx:Koa.DefaultContext,next:Function)=>{
    console.log("方法中间件--MethondMiddleware")
    // throw new Error("方法中间件--MethondMiddleware 错误")
    await next()
  }

  // 全局守卫
  export const setGolbalGuards:IGuard = async (option)=>{
    const {ctx } = option
    console.log("全局守卫 useAuthGuards" ,ctx.state,ctx.query.id)
    // throw new Error("全局守卫 useAuthGuards 错误")
    return true
    // return await ctx.query.id===ctx.state.useConfig.userId
  }

  // 类的守卫

  export const ClassGuard:IGuard = async (option)=>{
    const {ctx } = option
    console.log("类守卫 ClassGuards" ,ctx.state)
    // throw new Error("类守卫 ClassGuards 错误")

    return true
  }
  // 方法的守卫
  export const MethondGuard:IGuard = async (option)=>{
    const {ctx,get } = option
    console.log("方法守卫 MethondGuard" ,ctx.state ,get("apiName"))
    // throw new Error("方法守卫 MethondGuard 错误")

    return true
  }

  // 管道:作用参数的转换，设置默认值，校验
  export class  Validation extends Pipe {
    apply(option: IContextOption): void | Promise<void> {
       console.log("管道 Validation-apply:", option.getArgs())
      //  throw new Error("管道 Validation-apply: 参数有误")
    }

  }

  @Use(ClassMiddleware)
  @Guard(ClassGuard)
  @Controller("/user")
  export  class UserController  {

    @setMetadata("apiName",'这是元数据')
    @Use(MethondMiddleware)
    @Guard(MethondGuard)
    @GET("list")
    list(@Query() query: useDto, @Ctx() ctx: any,@Query("id") id: string,) {

      console.log("路由层:getbefore","state:",ctx.state,"query:",query);
      return this.getd()
    }

    @GET("setCookies")
    setCookies(@Cookie() cookie:Cookies,@Ctx() ctx: Koa.DefaultContext){
      cookie.set("userInfo",JSON.stringify(ctx.state.useConfig ))
      return "设置cokie"
    }
    @GET("getCookies")
    getCookies(@Cookie() cookie:Cookies){
       return cookie.get("userInfo") || {}
    }
    getd() {
      return "lallalla";
    }
  }

```

API 参数说明

