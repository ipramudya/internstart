import * as Yup from 'yup';

const schema = Yup.object().shape({
    member: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().required('Kolom data nama masih kosong'),
                npm: Yup.string()
                    .required('Kolom data NPM masih kosong')
                    .length(11, 'NPM yang dimasukan tidak valid'),
                grade: Yup.string().transform((value) =>
                    Yup.number()
                        .required('Kolom data tahun angkatan masih kosong')
                        .max(2023, 'Tahun angkatan yang dimasukan tidak valid')
                        .min(1999, 'Tahun angkatan yang dimasukan tidak valid')
                        .cast(value)
                ),
                email: Yup.string()
                    .required('Kolom data email tidak boleh kosong')
                    .email('Email yang dimasukan tidak valid'),
            })
        )
        .strict(),
    company: Yup.object()
        .shape({
            name: Yup.string().required('Kolom nama perusahaan tidak boleh kosong'),
            address: Yup.string().required('Kolom alamat perusahaan boleh kosong'),
        })
        .strict(),
    files: Yup.object()
        .shape({
            coverLetter: Yup.object({
                file: Yup.mixed().required('Berkas surat pengantar belum diunggah'),
            }),
            responseLetter: Yup.object({
                file: Yup.mixed().required('Berkas surat balasan belum diunggah'),
            }),
        })
        .strict(),
});

export default schema;
