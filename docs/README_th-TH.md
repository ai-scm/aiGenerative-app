# แชท Bedrock Claude (Nova)

![](https://img.shields.io/github/v/release/aws-samples/bedrock-claude-chat?style=flat-square)
![](https://img.shields.io/github/license/aws-samples/bedrock-claude-chat?style=flat-square)
![](https://img.shields.io/github/actions/workflow/status/aws-samples/bedrock-claude-chat/cdk.yml?style=flat-square)
[![](https://img.shields.io/badge/roadmap-view-blue)](https://github.com/aws-samples/bedrock-claude-chat/issues?q=is%3Aissue%20state%3Aopen%20label%3Aroadmap)

[English](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/README.md) | [日本語](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_ja-JP.md) | [한국어](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_ko-KR.md) | [中文](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_zh-CN.md) | [Français](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_fr-FR.md) | [Deutsch](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_de-DE.md) | [Español](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_es-ES.md) | [Italian](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_it-IT.md) | [Norsk](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_nb-NO.md) | [ไทย](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_th-TH.md) | [Bahasa Indonesia](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_id-ID.md) | [Bahasa Melayu](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_ms-MY.md) | [Tiếng Việt](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_vi-VN.md)

> [!Warning]  
> **เผยแพร่ V2 แล้ว กรุณาตรวจสอบ[คู่มือการย้ายระบบ](./migration/V1_TO_V2_th-TH.md)อย่างระมัดระวัง โดยไม่มีการดูแลใดๆ **หุ่นยนต์จาก V1 จะกลายเป็นใช้งานไม่ได้**

แชทบอทหลายภาษาที่ใช้โมเดล LLM ที่ให้บริการโดย [Amazon Bedrock](https://aws.amazon.com/bedrock/) สำหรับ AI เชิงสร้างสรรค์

### ดูภาพรวมและวิธีติดตั้งบน YouTube

[![ภาพรวม](https://img.youtube.com/vi/PDTGrHlaLCQ/hq1.jpg)](https://www.youtube.com/watch?v=PDTGrHlaLCQ)

### การสนทนาพื้นฐาน

![](./imgs/demo.gif)

### การปรับแต่งหุ่นยนต์

เพิ่มคำแนะนำของคุณเองและให้ความรู้ภายนอกเป็น URL หรือไฟล์ (หรือที่รู้จักกันว่า [RAG](https://aws.amazon.com/what-is/retrieval-augmented-generation/)) หุ่นยนต์สามารถแชร์กันระหว่างผู้ใช้แอปพลิเคชัน หุ่นยนต์ที่กำหนดเองยังสามารถเผยแพร่เป็น API แบบสแตนด์อโลนได้ (ดู[รายละเอียด](./PUBLISH_API_th-TH.md))

![](./imgs/bot_creation.png)
![](./imgs/bot_chat.png)
![](./imgs/bot_api_publish_screenshot3.png)

> [!Important]
> ด้วยเหตุผลด้านการกำกับดูแล เฉพาะผู้ใช้ที่ได้รับอนุญาตเท่านั้นที่สามารถสร้างหุ่นยนต์ที่กำหนดเองได้ เพื่ออนุญาตให้สร้างหุ่นยนต์ที่กำหนดเอง ผู้ใช้ต้องเป็นสมาชิกของกลุ่มที่เรียกว่า `CreatingBotAllowed` ซึ่งสามารถตั้งค่าได้ผ่านคอนโซลการจัดการ > Amazon Cognito User pools หรือ aws cli โปรดทราบว่าไอดีพูลผู้ใช้สามารถอ้างอิงได้โดยเข้าถึง CloudFormation > BedrockChatStack > Outputs > `AuthUserPoolIdxxxx`

### แดชบอร์ดผู้ดูแลระบบ

<details>
<summary>แดชบอร์ดผู้ดูแลระบบ</summary>

วิเคราะห์การใช้งานสำหรับแต่ละผู้ใช้ / หุ่นยนต์บนแดชบอร์ดผู้ดูแลระบบ [รายละเอียด](./ADMINISTRATOR_th-TH.md)

![](./imgs/admin_bot_analytics.png)

</details>

### เอเจนต์ขับเคลื่อนด้วย LLM

<details>
<summary>เอเจนต์ขับเคลื่อนด้วย LLM</summary>

โดยใช้[ฟังก์ชันเอเจนต์](./AGENT_th-TH.md) แชทบอทของคุณสามารถจัดการงานที่ซับซ้อนได้โดยอัตโนมัติ ตัวอย่างเช่น เพื่อตอบคำถามของผู้ใช้ เอเจนต์สามารถดึงข้อมูลที่จำเป็นจากเครื่องมือภายนอกหรือแบ่งงานออกเป็นหลายขั้นตอนเพื่อประมวลผล

![](./imgs/agent1.png)
![](./imgs/agent2.png)

</details>

## 🚀 การปรับใช้งานแบบง่ายดาย

- ในภูมิภาค us-east-1 เปิด [การเข้าถึงโมเดล Bedrock](https://us-east-1.console.aws.amazon.com/bedrock/home?region=us-east-1#/modelaccess) > `จัดการการเข้าถึงโมเดล` > เลือกทั้งหมดของ `Anthropic / Claude 3`, ทั้งหมดของ `Amazon / Nova`, `Amazon / Titan Text Embeddings V2` และ `Cohere / Embed Multilingual` แล้วคลิก `บันทึกการเปลี่ยนแปลง`

<details>
<summary>ภาพหน้าจอ</summary>

![](./imgs/model_screenshot.png)

</details>

- เปิด [CloudShell](https://console.aws.amazon.com/cloudshell/home) ในภูมิภาคที่คุณต้องการปรับใช้งาน
- เรียกใช้การปรับใช้งานด้วยคำสั่งต่อไปนี้ หากคุณต้องการระบุเวอร์ชันที่จะปรับใช้งานหรือต้องใช้นโยบายความปลอดภัย กรุณาระบุพารามิเตอร์ที่เหมาะสมจาก [พารามิเตอร์เสริม](#optional-parameters)

```sh
git clone https://github.com/aws-samples/bedrock-claude-chat.git
cd bedrock-claude-chat
chmod +x bin.sh
./bin.sh
```

- คุณจะได้รับการถามว่าเป็นผู้ใช้ใหม่หรือใช้ v2 หากคุณไม่ใช่ผู้ใช้ต่อเนื่องจาก v0 กรุณาป้อน `y`

### พารามิเตอร์เสริม

คุณสามารถระบุพารามิเตอร์ต่อไปนี้ระหว่างการปรับใช้งานเพื่อเพิ่มความปลอดภัยและการปรับแต่ง:

- **--disable-self-register**: ปิดการลงทะเบียนด้วยตนเอง (ค่าเริ่มต้น: เปิดใช้งาน) หากตั้งค่านี้ คุณจะต้องสร้างผู้ใช้ทั้งหมดบน Cognito และจะไม่อนุญาตให้ผู้ใช้ลงทะเบียนบัญชีด้วยตนเอง
- **--enable-lambda-snapstart**: เปิดใช้งาน [Lambda SnapStart](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html) (ค่าเริ่มต้น: ปิดใช้งาน) หากตั้งค่านี้ จะปรับปรุงเวลาเริ่มต้นแบบเย็นสำหรับฟังก์ชัน Lambda โดยให้เวลาตอบสนองที่เร็วขึ้นเพื่อประสบการณ์ผู้ใช้ที่ดีขึ้น
- **--ipv4-ranges**: รายการช่วง IPv4 ที่อนุญาตคั่นด้วยเครื่องหมายจุลภาค (ค่าเริ่มต้น: อนุญาต IPv4 ทั้งหมด)
- **--ipv6-ranges**: รายการช่วง IPv6 ที่อนุญาตคั่นด้วยเครื่องหมายจุลภาค (ค่าเริ่มต้น: อนุญาต IPv6 ทั้งหมด)
- **--disable-ipv6**: ปิดการเชื่อมต่อผ่าน IPv6 (ค่าเริ่มต้น: เปิดใช้งาน)
- **--allowed-signup-email-domains**: รายการโดเมนอีเมลที่อนุญาตให้ลงทะเบียนคั่นด้วยเครื่องหมายจุลภาค (ค่าเริ่มต้น: ไม่มีการจำกัดโดเมน)
- **--bedrock-region**: กำหนดภูมิภาคที่ Bedrock มีให้ (ค่าเริ่มต้น: us-east-1)
- **--repo-url**: ที่เก็บ Bedrock Claude Chat แบบกำหนดเองที่จะปรับใช้งาน หากทำการ fork หรือใช้การควบคุมซอร์ส (ค่าเริ่มต้น: https://github.com/aws-samples/bedrock-claude-chat.git)
- **--version**: เวอร์ชันของ Bedrock Claude Chat ที่จะปรับใช้งาน (ค่าเริ่มต้น: เวอร์ชันล่าสุดในการพัฒนา)
- **--cdk-json-override**: คุณสามารถแทนที่ค่าคอนเท็กซ์ CDK ใดๆ ระหว่างการปรับใช้งานโดยใช้บล็อก JSON แทนที่ ซึ่งช่วยให้คุณสามารถแก้ไขการกำหนดค่าโดยไม่ต้องแก้ไขไฟล์ cdk.json โดยตรง

ตัวอย่างการใช้งาน:

```bash
./bin.sh --cdk-json-override '{
  "context": {
    "selfSignUpEnabled": false,
    "enableLambdaSnapStart": true,
    "allowedIpV4AddressRanges": ["192.168.1.0/24"],
    "allowedSignUpEmailDomains": ["example.com"]
  }
}'
```

JSON แทนที่ต้องมีโครงสร้างเดียวกับ cdk.json คุณสามารถแทนที่ค่าคอนเท็กซ์ใดๆ รวมถึง:

- `selfSignUpEnabled`
- `enableLambdaSnapStart`
- `allowedIpV4AddressRanges`
- `allowedIpV6AddressRanges`
- `allowedSignUpEmailDomains`
- `bedrockRegion`
- `enableRagReplicas`
- `enableBedrockCrossRegionInference`
- และค่าคอนเท็กซ์อื่นๆ ที่กำหนดใน cdk.json

> [!หมายเหตุ]
> ค่าแทนที่จะถูกผสานกับการกำหนดค่า cdk.json ที่มีอยู่ระหว่างการปรับใช้งานใน AWS code build ค่าที่ระบุในการแทนที่จะมีความสำคัญสูงกว่าค่าใน cdk.json

#### ตัวอย่างคำสั่งพร้อมพารามิเตอร์:

```sh
./bin.sh --disable-self-register --ipv4-ranges "192.0.2.0/25,192.0.2.128/25" --ipv6-ranges "2001:db8:1:2::/64,2001:db8:1:3::/64" --allowed-signup-email-domains "example.com,anotherexample.com" --bedrock-region "us-west-2" --version "v1.2.6"
```

- หลังจากประมาณ 35 นาที คุณจะได้รับผลลัพธ์ต่อไปนี้ ซึ่งคุณสามารถเข้าถึงได้จากเบราว์เซอร์ของคุณ

```
URL หน้าหลัก: https://xxxxxxxxx.cloudfront.net
```

![](./imgs/signin.png)

หน้าจอลงทะเบียนจะปรากฏขึ้นดังที่แสดงข้างต้น ที่ซึ่งคุณสามารถลงทะเบียนอีเมลและเข้าสู่ระบบ

> [!สำคัญ]
> โดยไม่มีการตั้งค่าพารามิเตอร์เสริม วิธีการปรับใช้งานนี้จะอนุญาตให้ผู้ที่ทราบ URL สามารถลงทะเบียนได้ สำหรับการใช้งานในระบบผลิต ขอแนะนำอย่างยิ่งให้เพิ่มการจำกัด IP และปิดการลงทะเบียนด้วยตนเองเพื่อลดความเสี่ยงด้านความปลอดภัย (คุณสามารถกำหนด allowed-signup-email-domains เพื่อจำกัดผู้ใช้ให้เป็นเพียงที่อยู่อีเมลจากโดเมนบริษัทของคุณเท่านั้น) ใช้ทั้ง ipv4-ranges และ ipv6-ranges สำหรับการจำกัด IP และปิดการลงทะเบียนด้วยตนเองโดยใช้ disable-self-register เมื่อเรียกใช้ ./bin

> [!เคล็ดลับ]
> หาก `URL หน้าหลัก` ไม่ปรากฏหรือ Bedrock Claude Chat ไม่ทำงานอย่างถูกต้อง อาจเป็นปัญหากับเวอร์ชันล่าสุด ในกรณีนี้ กรุณาเพิ่ม `--version "v1.2.6"` ลงในพารามิเตอร์และลองปรับใช้งานอีกครั้ง

## สถาปัตยกรรม

เป็นสถาปัตยกรรมที่สร้างบนบริการที่มีการจัดการโดย AWS ซึ่งขจัดความจำเป็นในการจัดการโครงสร้างพื้นฐาน การใช้ Amazon Bedrock ไม่จำเป็นต้องสื่อสารกับ API นอก AWS ซึ่งช่วยให้สามารถปรับใช้แอปพลิเคชันที่มีความสามารถในการปรับขนาด น่าเชื่อถือ และปลอดภัย

- [Amazon DynamoDB](https://aws.amazon.com/dynamodb/): ฐานข้อมูล NoSQL สำหรับจัดเก็บประวัติการสนทนา
- [Amazon API Gateway](https://aws.amazon.com/api-gateway/) + [AWS Lambda](https://aws.amazon.com/lambda/): จุดปลายทาง API แบ็กเอนด์ ([AWS Lambda Web Adapter](https://github.com/awslabs/aws-lambda-web-adapter), [FastAPI](https://fastapi.tiangolo.com/))
- [Amazon CloudFront](https://aws.amazon.com/cloudfront/) + [S3](https://aws.amazon.com/s3/): การส่งมอบแอปพลิเคชันหน้าบ้าน ([React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/))
- [AWS WAF](https://aws.amazon.com/waf/): การจำกัดที่อยู่ IP
- [Amazon Cognito](https://aws.amazon.com/cognito/): การรับรองตัวตนผู้ใช้
- [Amazon Bedrock](https://aws.amazon.com/bedrock/): บริการที่มีการจัดการเพื่อใช้โมเดลพื้นฐานผ่าน API
- [Amazon Bedrock Knowledge Bases](https://aws.amazon.com/bedrock/knowledge-bases/): ให้อินเทอร์เฟซที่มีการจัดการสำหรับการสร้างข้อมูลแบบดึงข้อมูลเสริม ([RAG](https://aws.amazon.com/what-is/retrieval-augmented-generation/)) โดยนำเสนอบริการสำหรับการฝังและแยกวิเคราะห์เอกสาร
- [Amazon EventBridge Pipes](https://aws.amazon.com/eventbridge/pipes/): รับเหตุการณ์จาก DynamoDB stream และเรียกใช้ Step Functions เพื่อฝังความรู้ภายนอก
- [AWS Step Functions](https://aws.amazon.com/step-functions/): การประสานงานเส้นท่อการรวบรวมข้อมูลเพื่อฝังความรู้ภายนอกใน Bedrock Knowledge Bases
- [Amazon OpenSearch Serverless](https://aws.amazon.com/opensearch-service/features/serverless/): ทำหน้าที่เป็นฐานข้อมูลแบ็กเอนด์สำหรับ Bedrock Knowledge Bases โดยให้ความสามารถในการค้นหาแบบเต็มข้อความและการค้นหาแบบเวกเตอร์ ช่วยให้สามารถดึงข้อมูลที่เกี่ยวข้องได้อย่างแม่นยำ
- [Amazon Athena](https://aws.amazon.com/athena/): บริการสอบถามเพื่อวิเคราะห์บัคเก็ต S3

![](./imgs/arch.png)

## การปรับใช้ด้วย CDK

การปรับใช้แบบง่ายๆ ใช้ [AWS CodeBuild](https://aws.amazon.com/codebuild/) เพื่อดำเนินการปรับใช้ด้วย CDK ภายใน ส่วนนี้อธิบายขั้นตอนการปรับใช้โดยตรงด้วย CDK

- กรุณาเตรียม UNIX, Docker และสภาพแวดล้อมการทำงานของ Node.js หากไม่มี คุณสามารถใช้ [Cloud9](https://github.com/aws-samples/cloud9-setup-for-prototyping)

> [!สำคัญ]
> หากพื้นที่จัดเก็บข้อมูลในสภาพแวดล้อมท้องถิ่นไม่เพียงพอระหว่างการปรับใช้ CDK bootstrapping อาจส่งผลให้เกิดข้อผิดพลาด หากคุณกำลังทำงานใน Cloud9 เป็นต้น ขอแนะนำให้ขยายขนาดปริมาณของอินสแตนซ์ก่อนการปรับใช้

- โคลนที่เก็บข้อมูลนี้

```
git clone https://github.com/aws-samples/bedrock-claude-chat
```

- ติดตั้งแพ็คเกจ npm

```
cd bedrock-claude-chat
cd cdk
npm ci
```

- หากจำเป็น ให้แก้ไขรายการต่อไปนี้ใน [cdk.json](./cdk/cdk.json) หากจำเป็น

  - `bedrockRegion`: ภูมิภาคที่ Bedrock พร้อมใช้งาน **หมายเหตุ: Bedrock ยังไม่รองรับทุกภูมิภาค**
  - `allowedIpV4AddressRanges`, `allowedIpV6AddressRanges`: ช่วง IP แอดเดรสที่อนุญาต
  - `enableLambdaSnapStart`: ค่าเริ่มต้นคือ true ตั้งค่าเป็น false หากปรับใช้ใน[ภูมิภาคที่ไม่รองรับ Lambda SnapStart สำหรับฟังก์ชัน Python](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html#snapstart-supported-regions)

- ก่อนการปรับใช้ CDK คุณจะต้องทำ Bootstrap สำหรับภูมิภาคที่คุณกำลังปรับใช้หนึ่งครั้ง

```
npx cdk bootstrap
```

- ปรับใช้โปรเจ็คตัวอย่างนี้

```
npx cdk deploy --require-approval never --all
```

- คุณจะได้รับเอาต์พุตที่คล้ายกับต่อไปนี้ URL ของเว็บแอปจะแสดงใน `BedrockChatStack.FrontendURL` ดังนั้นโปรดเข้าถึงจากเบราว์เซอร์ของคุณ

```sh
 ✅  BedrockChatStack

✨  เวลาในการปรับใช้: 78.57s

เอาต์พุต:
BedrockChatStack.AuthUserPoolClientIdXXXXX = xxxxxxx
BedrockChatStack.AuthUserPoolIdXXXXXX = ap-northeast-1_XXXX
BedrockChatStack.BackendApiBackendApiUrlXXXXX = https://xxxxx.execute-api.ap-northeast-1.amazonaws.com
BedrockChatStack.FrontendURL = https://xxxxx.cloudfront.net
```

## อื่นๆ

### กำหนดค่าการสนับสนุนโมเดล Mistral

อัปเดต `enableMistral` เป็น `true` ใน [cdk.json](./cdk/cdk.json) และรัน `npx cdk deploy`

```json
...
  "enableMistral": true,
```

> [!สำคัญ]
> โครงการนี้มุ่งเน้นที่โมเดล Anthropic Claude โมเดล Mistral ได้รับการสนับสนุนอย่างจำกัด ตัวอย่างเช่น ตัวอย่างพรอมพ์จะอ้างอิงจากโมเดล Claude นี่เป็นตัวเลือกสำหรับ Mistral เท่านั้น เมื่อคุณเปิดใช้งานโมเดล Mistral คุณสามารถใช้โมเดล Mistral สำหรับฟีเจอร์แชททั้งหมด ไม่ใช่ทั้ง Claude และ Mistral

### กำหนดค่าการสร้างข้อความเริ่มต้น

ผู้ใช้สามารถปรับ[พารามิเตอร์การสร้างข้อความ](https://docs.anthropic.com/claude/reference/complete_post)จากหน้าจอสร้างบอทแบบกำหนดเอง หากบอทไม่ถูกใช้ พารามิเตอร์เริ่มต้นที่ตั้งใน [config.py](./backend/app/config.py) จะถูกใช้

```py
DEFAULT_GENERATION_CONFIG = {
    "max_tokens": 2000,
    "top_k": 250,
    "top_p": 0.999,
    "temperature": 0.6,
    "stop_sequences": ["Human: ", "Assistant: "],
}
```

### ลบทรัพยากร

หากใช้ CLI และ CDK ให้ใช้ `npx cdk destroy` หากไม่ใช่ ให้เข้าถึง [CloudFormation](https://console.aws.amazon.com/cloudformation/home) แล้วลบ `BedrockChatStack` และ `FrontendWafStack` ด้วยตนเอง โปรดทราบว่า `FrontendWafStack` อยู่ในภูมิภาค `us-east-1`

### การตั้งค่าภาษา

สินทรัพย์นี้ตรวจจับภาษาอัตโนมัติโดยใช้ [i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector) คุณสามารถสลับภาษาจากเมนูแอปพลิเคชัน หรือสามารถใช้ Query String เพื่อตั้งภาษาได้ดังนี้

> `https://example.com?lng=ja`

### ปิดการสมัครด้วยตนเอง

ตัวอย่างนี้เปิดใช้งานการสมัครด้วยตนเองตามค่าเริ่มต้น เพื่อปิดการสมัครด้วยตนเอง ให้เปิด [cdk.json](./cdk/cdk.json) และเปลี่ยน `selfSignUpEnabled` เป็น `false` หากคุณกำหนดค่า[ผู้ให้บริการยืนยันตัวตนภายนอก](#external-identity-provider) ค่าจะถูกละเลยและปิดการใช้งานโดยอัตโนมัติ

### จำกัดโดเมนสำหรับที่อยู่อีเมลในการสมัคร

ตามค่าเริ่มต้น ตัวอย่างนี้ไม่จำกัดโดเมนสำหรับที่อยู่อีเมลในการสมัคร เพื่ออนุญาตให้สมัครเฉพาะจากโดเมนที่ระบุ ให้เปิด `cdk.json` และระบุโดเมนเป็นรายการใน `allowedSignUpEmailDomains`

```ts
"allowedSignUpEmailDomains": ["example.com"],
```

### ผู้ให้บริการยืนยันตัวตนภายนอก

ตัวอย่างนี้รองรับผู้ให้บริการยืนยันตัวตนภายนอก ปัจจุบันเรารองรับ [Google](./idp/SET_UP_GOOGLE_th-TH.md) และ [ผู้ให้บริการ OIDC แบบกำหนดเอง](./idp/SET_UP_CUSTOM_OIDC_th-TH.md)

### เพิ่มผู้ใช้ใหม่ในกลุ่มโดยอัตโนมัติ

ตัวอย่างนี้มีกลุ่มต่อไปนี้เพื่อให้สิทธิ์กับผู้ใช้:

- [`Admin`](./ADMINISTRATOR_th-TH.md)
- [`CreatingBotAllowed`](#bot-personalization)
- [`PublishAllowed`](./PUBLISH_API_th-TH.md)

หากคุณต้องการให้ผู้ใช้ที่สร้างใหม่เข้าร่วมกลุ่มโดยอัตโนมัติ คุณสามารถระบุได้ใน [cdk.json](./cdk/cdk.json)

```json
"autoJoinUserGroups": ["CreatingBotAllowed"],
```

ตามค่าเริ่มต้น ผู้ใช้ที่สร้างใหม่จะเข้าร่วมกลุ่ม `CreatingBotAllowed`

### กำหนดค่าการทำซ้ำ RAG

`enableRagReplicas` เป็นตัวเลือกใน [cdk.json](./cdk/cdk.json) ที่ควบคุมการตั้งค่าการทำซ้ำสำหรับฐานข้อมูล RAG โดยเฉพาะ Knowledge Bases ที่ใช้ Amazon OpenSearch Serverless

- **ค่าเริ่มต้น**: true
- **true**: เพิ่มความพร้อมใช้งานโดยเปิดใช้การทำซ้ำเพิ่มเติม เหมาะสำหรับสภาพแวดล้อมการผลิต แต่เพิ่มค่าใช้จ่าย
- **false**: ลดค่าใช้จ่ายโดยใช้การทำซ้ำน้อยลง เหมาะสำหรับการพัฒนาและการทดสอบ

นี่เป็นการตั้งค่าระดับบัญชี/ภูมิภาค ส่งผลกระทบต่อแอปพลิเคชันทั้งหมดแทนที่จะเป็นบอทแต่ละตัว

> [!บันทึก]
> ตั้งแต่มิถุนายน 2024 Amazon OpenSearch Serverless รองรับ 0.5 OCU ลดต้นทุนสำหรับงานขนาดเล็ก การปรับใช้แบบผลิตสามารถเริ่มที่ 2 OCU ในขณะที่งานพัฒนา/ทดสอบสามารถใช้ 1 OCU OpenSearch Serverless จะปรับขนาดอัตโนมัติตามความต้องการของงาน สำหรับรายละเอียดเพิ่มเติม เยี่ยมชม[ประกาศ](https://aws.amazon.com/jp/about-aws/whats-new/2024/06/amazon-opensearch-serverless-entry-cost-half-collection-types/)

### การอนุมานข้ามภูมิภาค

[การอนุมานข้ามภูมิภาค](https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles-support.html) ช่วยให้ Amazon Bedrock สามารถส่งคำขออนุมานโมเดลแบบไดนามิกข้ามหลายภูมิภาค AWS เพื่อเพิ่มความสามารถในการรองรับช่วงความต้องการสูง หากต้องการกำหนดค่า ให้แก้ไข `cdk.json`

```json
"enableBedrockCrossRegionInference": true
```

### Lambda SnapStart

[Lambda SnapStart](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html) ปรับปรุงเวลาเริ่มต้นแบบเย็นสำหรับฟังก์ชัน Lambda เพื่อให้มีเวลาตอบสนองที่เร็วขึ้นเพื่อประสบการณ์ที่ดีขึ้นของผู้ใช้ ในทางกลับกัน สำหรับฟังก์ชัน Python มีค่าใช้จ่าย[ขึ้นอยู่กับขนาดแคช](https://aws.amazon.com/lambda/pricing/#SnapStart_Pricing) และ[ไม่พร้อมใช้งานในบางภูมิภาค](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html#snapstart-supported-regions) ในปัจจุบัน หากต้องการปิดใช้งาน SnapStart ให้แก้ไข `cdk.json`

```json
"enableLambdaSnapStart": false
```

### กำหนดค่าโดเมนแบบกำหนดเอง

คุณสามารถกำหนดค่าโดเมนแบบกำหนดเองสำหรับการกระจาย CloudFront โดยตั้งค่าพารามิเตอร์ต่อไปนี้ใน [cdk.json](./cdk/cdk.json):

```json
{
  "alternateDomainName": "chat.example.com",
  "hostedZoneId": "Z0123456789ABCDEF"
}
```

- `alternateDomainName`: ชื่อโดเมนแบบกำหนดเองสำหรับแอปพลิเคชันแชทของคุณ (เช่น chat.example.com)
- `hostedZoneId`: ID ของ Route 53 hosted zone ที่จะสร้างระเบียน DNS

เมื่อมีการระบุพารามิเตอร์เหล่านี้ การปรับใช้จะดำเนินการโดยอัตโนมัติ:

- สร้างใบรับรอง ACM ด้วย DNS validation ในภูมิภาค us-east-1
- สร้างระเบียน DNS ที่จำเป็นใน Route 53 hosted zone ของคุณ
- กำหนดค่า CloudFront ให้ใช้โดเมนแบบกำหนดเองของคุณ

> [!บันทึก]
> โดเมนต้องจัดการโดย Route 53 ในบัญชี AWS ของคุณ คุณสามารถค้นหา hosted zone ID ได้ในคอนโซล Route 53

### การพัฒนาในเครื่อง

ดู [การพัฒนาในเครื่อง](./LOCAL_DEVELOPMENT_th-TH.md)

### การมีส่วนร่วม

ขอบคุณที่พิจารณาการมีส่วนร่วมในที่เก็บนี้! เรายินดีรับการแก้ไขบัก การแปลภาษา (i18n) การปรับปรุงฟีเจอร์ [เครื่องมือเอเจนต์](./docs/AGENT.md#how-to-develop-your-own-tools) และการปรับปรุงอื่นๆ

สำหรับการปรับปรุงฟีเจอร์และการปรับปรุงอื่นๆ **ก่อนสร้าง Pull Request เราจะขอบคุณอย่างยิ่งหากคุณสามารถสร้าง Feature Request Issue เพื่อหารือเกี่ยวกับแนวทางการดำเนินการและรายละเอียด สำหรับการแก้ไขบัก และการแปลภาษา (i18n) ให้ดำเนินการสร้าง Pull Request ได้โดยตรง**

โปรดดูแนวทางต่อไปนี้ก่อนมีส่วนร่วม:

- [การพัฒนาในเครื่อง](./LOCAL_DEVELOPMENT_th-TH.md)
- [การมีส่วนร่วม](./CONTRIBUTING_th-TH.md)

## ผู้ติดต่อ

- [Takehiro Suzuki](https://github.com/statefb)
- [Yusuke Wada](https://github.com/wadabee)
- [Yukinobu Mine](https://github.com/Yukinobu-Mine)

## 🏆 ผู้มีส่วนร่วมสำคัญ

- [k70suK3-k06a7ash1](https://github.com/k70suK3-k06a7ash1)
- [fsatsuki](https://github.com/fsatsuki)

## ผู้มีส่วนร่วม

[![ผู้มีส่วนร่วมของ bedrock claude chat](https://contrib.rocks/image?repo=aws-samples/bedrock-claude-chat&max=1000)](https://github.com/aws-samples/bedrock-claude-chat/graphs/contributors)

## สัญญาอนุญาต

ไลบรารีนี้ได้รับอนุญาตภายใต้ใบอนุญาต MIT-0 ดูที่[ไฟล์สัญญาอนุญาต](./LICENSE)