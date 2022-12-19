#

- 结算单增加功能：
  - 切换显示 折扣/税率
  - 导出到 Excel 继续修改

## 打单流程

1. 添加一单：新建/复制/模板
   - 自动生成：单号、日期
2. 填写车牌号：
   - 自动填写车型、车主姓名、联系电话、会员卡号
   - 提示上次里程、消费总金额、（每项提示历史价格、提供原来单据简版的预览）
3. 新车：填写其他资料
4. 选择：送修要求故障现象
5. 选择：建议追加项目组合/忽略
6. 选择：维修项目：
   - 选择追加组合/空白行直接填写/左按钮插入行
   - 编辑行内容：
     - 修改编号（自动补充），自动修改描述
     - 修改描述（自动填充），自动修改编号（如有）
   - 上下移动行/删除行
7. 填写：材料项：
   - （自动提示历史单价）、数量、单价
   - 选择追加组合/右侧按钮插入行
   - 上下移动行/删除行
8. 填写/选择显示：税金/折扣
9. 编辑备注项
   - 自动添加默认备注
   - 删除/增加条款
   - 手写新条款
10. 选择显示语言
11. 选择是草稿/已确认报价/交车未付款/已付款
12. 保存
13. 打印预览/打印/导出 PDF

## 结算单检索

> 字段（存储）：sn,date,plate,model,mile,client,tel,vip,malfunctions,maintenance,tax,discount,notice,languages,status,team
> 摘要（显示）：sn,date,plate,model,client,vip,labor,material,tax,discount,total_amount,status,duration,team

1. 查看摘要：筛选、排序
2. 选择行统计功能。

## 日常功能：

- 计划(每早-可打印）/日志（每晚-可打印，进度变化）
- 现场车辆管理，位置/锁/接车单/进度/接手时间/提车计划

# v2 plan

## 界面设计 功能规划

- 综合信息界面
  - 院内车辆 状态，外部车辆 状态 (link to 例会界面)
  - 项目一览：近几个月项目数、金额、人工、利润 柱状图(与近 30 天 对比) link to 车辆界面
  - 材料一览：库存 数量、余额、盘点时间提醒
  - 人员一览：
  - 开支一览行政、安保、房租水电、等费用一览
  - 现金账一览：余额、对账时间提醒
- 例会界面(针对车辆：今日总结、明日安排)
- 项目界面
  - x-data-gird
  - 车简单列表+单车信息
- 材料
  - 库房
- 人员
  - 信息
  - 考勤
  - 已产生的人工费
## 性能优化
