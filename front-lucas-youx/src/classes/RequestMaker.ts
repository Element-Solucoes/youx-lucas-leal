import * as $ from 'jquery';

// Uma classe bem simples que faz requisições customizadas para o backend.
export class RequestMaker {
  public static MakeRequest(
    path: string,
    method: string,
    data?: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    return new Promise<Record<string, unknown>>((resolve, reject) => {
      $.ajax({
        url: path,
        type: method,
        data: data ? JSON.stringify(data) : '',
        crossDomain: true,
        dataType: 'json',
        processData: false,
        contentType: false,
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'AUTH-LUCAS-YOUX-1008',
          'Access-Control-Allow-Origin': '*',
        },
        success: function (data) {
          resolve(data);
        },
        error: function (data) {
          reject(data.responseText);
        },
      });
    });
  }
}
