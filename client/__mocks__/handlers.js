import { rest } from 'msw';
export const handlers = [
  rest.post('/api/auth/sign-up', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json([
        {
          placeholder: 'im placeholder text'
        }
      ])
    );
  })
];
