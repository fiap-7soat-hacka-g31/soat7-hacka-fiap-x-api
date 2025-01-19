import { Given, Suite, Then, When } from '@fiap-x/acceptance-factory';
import { HttpService } from '@nestjs/axios';
import { strict as assert } from 'assert';
import { setTimeout } from 'timers/promises';

@Suite()
export class VideoSuite {
  private id: string;

  constructor(private readonly http: HttpService) {}

  @Given('a video is sent to the service')
  async uploadVideo() {
    const res = await this.http.axiosRef.post(
      'http://localhost:4000/v1/payments',
      {
        type: 'PixQrCode',
        amount: 999.99,
      },
    );
    this.id = res.data.id;
    await setTimeout(500);
  }

  @When('the app finishes storing the video')
  async appFinishedStoringVideo() {
    // noop: response is synchronous
  }

  @Then('the user received the video id')
  async verifyPaymentRejected() {
    assert.ok(this.id);
  }
}
