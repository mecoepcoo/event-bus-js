# EventBus-js
为了解决各种小程序需要全局事件通信的需求，实现了这个事件总线，它也可以用在任何能够运行js的地方。

起初我是用rxjs在微信小程序做事件总线和状态管理的，但是支付宝小程序屏蔽了global, window, self的访问，rxjs不能正常运行，恰好我的应用没有太复杂的逻辑，因此用这个简单的事件总线实现即可。
