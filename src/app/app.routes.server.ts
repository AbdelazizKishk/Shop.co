import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'detailsprod/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'detailsCatg/:category',
    renderMode: RenderMode.Client,
  },
];
