# Hitachi_Hackathon_20190323
Hitachi Hackathon in Shanghai Zhangjiang Xnode


众包平台合约地址：
https://ropsten.etherscan.io/address/0xeddd8b729de4c9a85cc9ac2335e82feccef110e1



众包平台接口文档

核心struct
```solidity
Bounty {
      address issuer; // 外包任务发布者
      uint deadline; // 外包任务截止时间，Unix时间戳，许多事物都只允许在此时间前做
      string data; // 外包任务的简要描述，尽量不要超出20字符（超过无所谓，但是gas比较贵）
      uint fulfillmentAmount;  // 完成一次该任务能够都得的奖励
      address arbiter;  // 出争议了负责仲裁的角色
      bool paysTokens;  // 是否token支付。如果不是则是ETH支付
      BountyStages bountyStage; // 该外包任务的状态
      uint balance;  // 该外包任务的奖金池。处于Active状态的外包必定这个值比fulfillmentAmount大
  }
```

1. 发布外包
```
  function issueBounty(
      address _issuer,
      uint _deadline,
      string _data,
      uint256 _fulfillmentAmount,
      address _arbiter,
      bool _paysTokens,
      address _tokenContract
  )
      public
      validateDeadline(_deadline)
      amountIsNotZero(_fulfillmentAmount)
      validateNotTooManyBounties
      returns (uint)
```
需提供：
_issuer，外包发布者
_deadline，截止时间，截止时间需要大于当前Unix时间戳。截止时间后，外包即使完成也不会接受
_data，外包的一些要求
_fulfillmentAmount，完成外包后的奖励，wei为单位。可能是Token，可能是ETH。不能为0。
_arbiter，仲裁者，这里是仲裁系统的合约地址
_paysTokens，奖励是token还是ETH
_tokenContract，如果奖励是token，这里填token的合约地址
发出事件event：
BountyIssued()
其他说明：
刚刚初始化的外包任务的状态是draft

2. 发布外包并激活外包
```
function issueAndActivateBounty(
      address _issuer,
      uint _deadline,
      string _data,
      uint256 _fulfillmentAmount,
      address _arbiter,
      bool _paysTokens,
      address _tokenContract,
      uint256 _value
  )
      public
      payable
      validateDeadline(_deadline)
      amountIsNotZero(_fulfillmentAmount)
      validateNotTooManyBounties
      returns (uint)
```
需提供：
同1
_value 外包发布方实际提供的token的总数。即赏金池，可能等于_fulfillmentAmount，此时该外包就奖赏一个人（应该是最快完成的那个），如果等于多个_fulfillmentAmount，此时奖赏多个完成的
发出事件Event：
BountyIssued()
ContributionAdded()
BountyActivated()
其他说明：
_value >= _fulfillmentAmount
如果奖励token（非ETH），不能传入eth，调用token合约从发布者把token转到该合约地址
如果奖励ETH，则需要_value == msg.value
3. 向某项外包资金池增加token/ETH
```
 function contribute (uint _bountyId, uint _value)
      payable
      public
      validateBountyArrayIndex(_bountyId)
      isBeforeDeadline(_bountyId)
      isNotDead(_bountyId)
      amountIsNotZero(_value)
      transferredAmountEqualsValue(_bountyId, _value)
```
需提供：
_bountyId，外包任务的索引，哪一个外包
_value，增加的token/ETH数量
发出事件Event：
ContributionAdded()
其他说明：
任何人都可以向某项外包任务的奖金池里面增加token
4. 激活外包任务
```
function activateBounty(uint _bountyId, uint _value)
      payable
      public
      validateBountyArrayIndex(_bountyId)
      isBeforeDeadline(_bountyId)
      onlyIssuer(_bountyId)
      transferredAmountEqualsValue(_bountyId, _value)
```
需提供：
_bountyId，外包任务的索引
_value，达到合约里面充当改外包任务的奖金池
发出事件Event：
ContributionAdded()
BountyActivated()
其他说明：
转入足够的资金，将该外包任务的状态改为Active
此函数只需要Issuer调用，即发布这个外包任务的人
5. 提交外包完成结果
```
function fulfillBounty(uint _bountyId, string _data)
      public
      validateBountyArrayIndex(_bountyId)
      validateNotTooManyFulfillments(_bountyId)
      isAtStage(_bountyId, BountyStages.Active)
      isBeforeDeadline(_bountyId)
      notIssuerOrArbiter(_bountyId)
```
需提供：
_bountyId，外包任务的索引
_data，外包实现的资料
发出的事件Event：
BountyFulfilled()
其他说明：
只需要路人调用，issuer和arbiter(仲裁者)不能调用
这里只提供要给录入功能，是否被Issuer认定还没有确定。
6. 更新外包任务完成的data
```
function updateFulfillment(uint _bountyId, uint _fulfillmentId, string _data)
      public
      validateBountyArrayIndex(_bountyId)
      validateFulfillmentArrayIndex(_bountyId, _fulfillmentId)
      onlyFulfiller(_bountyId, _fulfillmentId)
      notYetAccepted(_bountyId, _fulfillmentId)
```
需提供：
_bountyId:
_fulfillmentId：同一个外包任务可能有多个代码提交，这个参数就是区分是哪个提交
发出的事件Event：
FulfillmentUpdated()
其他说明：
只有该_fulfillmentId的完成者才能更新
该外包任务没有被Issuer接受
7.接受某个任务提交
```
function acceptFulfillment(uint _bountyId, uint _fulfillmentId)
      public
      validateBountyArrayIndex(_bountyId)
      validateFulfillmentArrayIndex(_bountyId, _fulfillmentId)
      onlyIssuerOrArbiter(_bountyId)
      isAtStage(_bountyId, BountyStages.Active)
      fulfillmentNotYetAccepted(_bountyId, _fulfillmentId)
      enoughFundsToPay(_bountyId)
```
需提供：
_bountyId
_fulfillmentId 同上
发出的事件Event：
FulfillmentAccepted()
其他说明：
Issuer或者仲裁者可以调用这个函数
该任务需处于Active状态
8. 关掉某个任务
```
function killBounty(uint _bountyId)
      public
      validateBountyArrayIndex(_bountyId)
      onlyIssuer(_bountyId)
```
需要提供：
_bountyId：任务id
发出的事件Event：
BountyKilled()
其他说明
只允许Issuer
9. 延长某任务的截止时间
```
function extendDeadline(uint _bountyId, uint _newDeadline)
      public
      validateBountyArrayIndex(_bountyId)
      onlyIssuer(_bountyId)
      newDeadlineIsValid(_bountyId, _newDeadline)
```
需要提供：
_bountyId:
_newDeadline：新的截止时间，要求比以前的要靠后，只允许issuer修改
发出的事件Event：
DeadlineExtended()
10. 转移某任务的Issuer
```
 function transferIssuer(uint _bountyId, address _newIssuer)
      public
      validateBountyArrayIndex(_bountyId)
      onlyIssuer(_bountyId)
```
11. 改变某任务的截止时间
```
function changeBountyDeadline(uint _bountyId, uint _newDeadline)
      public
      validateBountyArrayIndex(_bountyId)
      onlyIssuer(_bountyId)
      validateDeadline(_newDeadline)
      isAtStage(_bountyId, BountyStages.Draft)
```
12. 更新外包任务的data
```
function changeBountyData(uint _bountyId, string _newData)
      public
      validateBountyArrayIndex(_bountyId)
      onlyIssuer(_bountyId)
      isAtStage(_bountyId, BountyStages.Draft)
```
13. 修改外包任务的赏金
```
function changeBountyFulfillmentAmount(uint _bountyId, uint _newFulfillmentAmount)
      public
      validateBountyArrayIndex(_bountyId)
      onlyIssuer(_bountyId)
      isAtStage(_bountyId, BountyStages.Draft)
```
14. 修改外包任务的仲裁者
function changeBountyArbiter(uint _bountyId, address _newArbiter)
      public
      validateBountyArrayIndex(_bountyId)
      onlyIssuer(_bountyId)
      isAtStage(_bountyId, BountyStages.Draft)
15. 增加外包任务的赏金
```
function increasePayout(uint _bountyId, uint _newFulfillmentAmount, uint _value)
      public
      payable
      validateBountyArrayIndex(_bountyId)
      onlyIssuer(_bountyId)
      newFulfillmentAmountIsIncrease(_bountyId, _newFulfillmentAmount)
      transferredAmountEqualsValue(_bountyId, _value)
```
view(只读接口):
16. 得到某个任务的某个完成的数据
```
function getFulfillment(uint _bountyId, uint _fulfillmentId)
      public
      constant
      validateBountyArrayIndex(_bountyId)
      validateFulfillmentArrayIndex(_bountyId, _fulfillmentId)
      returns (bool, address, string)
```
17. 得到某个任务的数据
```
  function getBounty(uint _bountyId)
      public
      constant
      validateBountyArrayIndex(_bountyId)
      returns (address, uint, uint, bool, uint, uint)
```
18. 得到仲裁者地址
```
function getBountyArbiter(uint _bountyId)
      public
      constant
      validateBountyArrayIndex(_bountyId)
      returns (address)
```
19. 得到某个任务的_data
```
function getBountyData(uint _bountyId)
      public
      constant
      validateBountyArrayIndex(_bountyId)
      returns (string)
```
20.  得到某个任务的奖赏token的该token合约地址
```
function getBountyToken(uint _bountyId)
      public
      constant
      validateBountyArrayIndex(_bountyId)
      returns (address)
```
21. 得到当前全局有多少任务
```
function getNumBounties()
      public
      constant
      returns (uint)
``` 
22.  得到当前某任务有多少方案提交
```
function getNumFulfillments(uint _bountyId)
      public
      constant
      validateBountyArrayIndex(_bountyId)
      returns (uint)
```