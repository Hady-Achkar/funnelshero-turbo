import {Request, Response} from 'express'
import {prisma} from '../../lib'

interface UpdatePageDto {
  title?: string,
  data?: string,
  metatags?: string,

  isPublished?: boolean,

  link?: string,
}

function getUpdateData(body: UpdatePageDto) {
  const updateData: {
    title?: string,
    data?: string,
    metatags?: string,

    is_published?: boolean,
    published_at?: Date,

    link?: string,
  } = {};

  if (body.title) {
    updateData.title = body.title;
  }

  if (body.data) {
    updateData.data = body.data;
  }

  if (body.metatags) {
    updateData.metatags = body.metatags;
  }

  if (body.isPublished) {
    updateData.is_published = body.isPublished;
    updateData.published_at = new Date();
  }

  if (body.link) {
    updateData.link = body.link;
  }

  return updateData;
}

export default async (req: Request, res: Response) => {
  try {
    const page = await prisma.page.findUnique({
      where: {
        pageId: Number(req.params.id),
      },
    });

    if (!page) {
      return res.status(404).json({
        message: 'Page not found',
      });
    }

    if (req.body.title) {
      const pageWithTitleExist = await prisma.page.count({
        where: {
          title: req.body.title,
          funnelId: page.funnelId,
        },
      });
      
      if (pageWithTitleExist > 0) {
        return res.status(400).json({
          message: 'Page with that title already exists',
        });
      }
    }

    const updateData = getUpdateData(req.body);

    const updatedPage = await prisma.page.update({
      where: {
        pageId: page.pageId,
      },
      data: {
        ...updateData,
      },
    });

    res.json(updatedPage);
  } catch (err) {
    console.error(err)
		if (err instanceof Error) {
			return res.status(500).json({
				message: 'Internal Server Error',
				error: err.message,
				requestTime: new Date().toISOString(),
			})
		}
  }
}