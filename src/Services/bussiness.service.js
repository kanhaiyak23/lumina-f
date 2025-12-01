import { supabase } from "../supabaseClient";

export const businessService = {
    async fetchBusinessProfile() {
        const { data: business, error } = await supabase.from("business").select("*").single();

        if (error) {
            throw new Error(error.message);
        }

        return business;
    },

    async updateBusinessProfile(id, updateData) {
        const { data, error } = await supabase
            .from("business")
            .update(updateData)
            .eq("id", id)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    },

    //   async updateBusinessImage(id, imageFile: File) {
    //     const fileExt = imageFile.name.split('.').pop();
    //     const fileName = `${id}-${Date.now()}.${fileExt}`;

    //     const { error: uploadError } = await supabase.storage
    //       .from('business-images')
    //       .upload(fileName, imageFile);

    //     if (uploadError) {
    //       throw new Error(uploadError.message);
    //     }

    //     const { data: { publicUrl } } = supabase.storage
    //       .from('business-images')
    //       .getPublicUrl(fileName);

    //     const { data, error: updateError } = await supabase
    //       .from('business')
    //       .update({ profile_image: publicUrl })
    //       .eq('id', id)
    //       .select()
    //       .single();

    //     if (updateError) {
    //       throw new Error(updateError.message);
    //     }

    //     return data;
    //   }
};
