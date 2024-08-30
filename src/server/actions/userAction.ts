"use server";
import mongodbConnect from "@/lib/mongodbConnect";
import fs from "fs/promises";
import UserModel from "@/server/models/UserModel";
import { auth } from "@/auth";

import { revalidatePath } from "next/cache";
import { FilterQuery, isValidObjectId } from "mongoose";

// /api/users/search?keyoword=i&price[gt]=1000&sort[price]=desc&sort[ratingsAverage]=asc
export async function userListAction(params: any) {
  try {
    await mongodbConnect();
    const { user, keyword, price, sort, limit, page, subs, status } = params;

    // query

    let queryObj = params; // cleanObj({ ...params });
    let exclude = ["page", "sort", "limit", "fields"];
    exclude.forEach((el) => delete queryObj[el]);

    // replace
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // toOject
    queryObj = JSON.parse(queryStr);

    const myCustomLabels = {
      totalDocs: "totalUsers",
      docs: "users",
    };

    const options = {
      page: page || 1,
      limit: limit || 12,
      sort: sort ? sort : { updatedAt: "desc" },
      customLabels: myCustomLabels,
      lean: true,
    };

    if (keyword) {
      // query["$text"] = { $search: keyword };
      queryObj.name = { $regex: keyword, $options: "i" };
      delete queryObj["keyword"];
    }

    if (subs) {
      // query["$text"] = { $search: keyword };
      queryObj.subs = { $in: subs };
      // delete queryObj["subs"];
    }

    // if (!status) {
    //   queryObj.status = "active";
    // }

    if (status == "none") {
      delete queryObj["status"];
    }

    //@ts-ignore
    const paginator = await UserModel.paginate(queryObj, options);

    return JSON.parse(
      JSON.stringify({
        success: "ok",
        ...paginator,
      })
    );
  } catch (error: any) {
    return {
      error: error.message || "Failed to users",
      users: null,
    };
  }
}

export async function userCreateAction(params: any) {
  try {
    await mongodbConnect();
    const session = await auth();

    console.log(session);
    const {
      name,
      description,
      price,
      category,
      subs,
      city,
      province,
      priceType,
    } = params;

    let user = new UserModel({
      name,
      description,
      price,
      category,
      subs,

      city,
      province,
      priceType,
    });

    user = await user.save();

    return JSON.parse(JSON.stringify({ success: "ok", user }));
  } catch (error: any) {
    return {
      error: error.message || "Failed to create user, please try again later",
      user: null,
    };
  }
}

export async function userByIdAction(params: any) {
  try {
    await mongodbConnect();
    const userId = params.userId;
    const user = await UserModel.findById(userId).lean();

    if (!user) {
      return { error: "User not found", user: null };
    }

    return JSON.parse(JSON.stringify({ success: "ok", user }));
  } catch (error: any) {
    return { error: error.message || "User not found", user: null };
  }
}

export async function userBySlugAction(params: any) {
  try {
    await mongodbConnect();
    const slug = params.slug;
    const user = await UserModel.findOne({ slug })
      // .populate("image")
      .lean();

    if (!user) {
      return { error: "User not found", user: null };
    }

    return JSON.parse(JSON.stringify({ success: "ok", user }));
  } catch (error: any) {
    return { error: error.message || "User not found", user: null };
  }
}

export async function userReadAction(params: any) {
  try {
    await mongodbConnect();
    const userId = params.userId;
    const user = await UserModel.findById(userId).lean();

    if (!user) {
      return { error: "User not found" };
    }

    return JSON.parse(JSON.stringify({ success: "ok", user }));
  } catch (error: any) {
    return { error: error.message || "User not found" };
  }
}

export const userUpdateAction = async (params: any) => {
  try {
    await mongodbConnect();
    const session = await auth();

    if (!session?.user) {
      return { error: "User not found" };
    }
    let queryObj = params;
    const {
      userId,
      name,
      firstname,
      lastname,
      email,
      phone,
      birthdate,
      bio,
      gender,
      usertype,
      whatsapp,
      facebook,
      twitter,
      instagram,
      linkedin,
      address,
      province,
      city,
      postalcode,
    } = queryObj;

    queryObj.birthOfDate = new Date(queryObj.birthOfDate);

    let user = await UserModel.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        firstname,
        lastname,
        bio,
        gender,
        birthdate,
        usertype,
        phone,
        social: {
          facebook,
          twitter,
          instagram,
          linkedin,
          whatsapp,
        },
        address,
        city,
        province,
        postalcode,
      },
      { new: true }
    );

    console.log(queryObj);

    revalidatePath("/dashboard/account");
    return JSON.parse(
      JSON.stringify({
        user,
        success: "Account updated successfully",
      })
    );
  } catch (error: any) {
    return { error: error?.message || "Something went wrong" };
  }
};

export async function userUpdateRoleAction(params: {
  role: string;
  userId: string;
}) {
  try {
    await mongodbConnect();
    const { role, userId } = params;

    if (!isValidObjectId(userId)) {
      return { error: "Your user id is not valid" };
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { role },
      {
        new: true,
      }
    );

    return JSON.parse(
      JSON.stringify({
        success: `${user.name} role updated successfully to ${user?.role}`,
        user,
      })
    );
  } catch (error: any) {
    return { error: error.message || "Failed to update user status" };
  }
}

export async function userUpdateStatusAction(params: any) {
  try {
    await mongodbConnect();
    const { status, userId } = params;

    if (!isValidObjectId(userId)) {
      return { error: "Your user id is not valid" };
    }

    let statusData = { status };

    // switch (status) {
    //   case "archived":
    //     statusData = { status, archivedAt: Date.now() };
    //     break;
    //   case "active":
    //     statusData = { status, activedAt: Date.now(), archivedAt: null };
    //   default:
    //     statusData = { status };
    //     break;
    // }

    const user = await UserModel.findByIdAndUpdate(userId, statusData, {
      new: true,
    });

    return JSON.parse(
      JSON.stringify({
        success: `${user.name} status updated successfully to ${user?.status}`,
        user,
      })
    );
  } catch (error: any) {
    return { error: error.message || "Failed to update user status" };
  }
}

export async function userRemoveAction(params: any) {
  try {
    await mongodbConnect();
    const userId = params.userId;

    if (!isValidObjectId(userId)) {
      return { error: "Your user id is not valid" };
    }

    const user = await UserModel.findByIdAndDelete(userId);

    if (!user) {
      return { error: "Failed to delete, user not found" };
    }

    revalidatePath("/admin/users");
    return JSON.parse(
      JSON.stringify({ success: "User successfully deleted", user })
    );
  } catch (error: any) {
    return { error: error.message || "Failed to delete, user not found" };
  }
}

// export async function userUploadAction(params: any) {
//   try {
//     await mongodbConnect();
//     const { userId, files } = params;

//     const images = await resizeMultipleImages(files);

//     let user = await UserModel.findOneAndUpdate(
//       { _id: userId },
//       { $push: { images: images } },
//       { new: true }
//     );
//     return JSON.parse(JSON.stringify({ success: "ok", user }));
//   } catch (error: any) {
//     return { error: error.message || "Failed to upload, try again later" };
//   }
// }

export async function userUploadCoverImage(params: any) {
  try {
    await mongodbConnect();
    const { userId, files } = params;

    let user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { coverimage: files },
      { new: true }
    );

    return JSON.parse(JSON.stringify({ success: "ok", user }));
  } catch (error: any) {
    return { error: error.message || "Failed to upload, try again later" };
  }
}

export async function userRemoveImageAction(params: any) {
  try {
    await mongodbConnect();
    const { userId, image } = params;

    let user = await UserModel.findById(userId);
    user.images.pull({ _id: image._id });

    user = await user.save().then(async (user: any) => {
      let imageUrl = process.cwd() + "/public" + image.url;
      await fs.unlink(imageUrl).catch((err) => console.log("file not found"));
      return user;
    });
    return JSON.parse(JSON.stringify({ success: "ok", user }));
  } catch (error: any) {
    return {
      error: error.message || "Failed to remove file, try again later",
    };
  }
}

export async function userRelatedAction(params: any) {
  try {
    await mongodbConnect();
    const { userId, category } = params;

    const users = await UserModel.find({
      _id: { $ne: userId },
      category,
    })
      .limit(4)

      .lean();
    return JSON.parse(JSON.stringify({ success: "ok", users }));
  } catch (error: any) {
    return {
      error: error.message || "Failed to remove file, try again later",
      users: [],
    };
  }
}

// Like a post
export async function userSaveListingAction(params: {
  path: string;
  listingId: string;
}) {
  try {
    await mongodbConnect();
    const { path, listingId } = params;
    const session = await auth();
    const currentUser: any = session?.user;

    let user = await UserModel.findById(currentUser._id);

    if (!user) {
      return { error: "User not found" };
    }

    const isSaved = user?.saved.includes(listingId);

    if (isSaved) {
      user?.saved.pull(listingId);
    } else {
      user?.saved.push(listingId);
    }

    user = await user.save();

    revalidatePath(path);
    return JSON.parse(JSON.stringify({ success: "ok", user }));
  } catch (error: any) {
    return {
      error: error.message || "Failed to ,like, try again later",
      user: null,
    };
  }
}
