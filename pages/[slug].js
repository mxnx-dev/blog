import {MDXRemote} from 'next-mdx-remote';
import { getFileBySlug, getFiles} from "../lib/mdx"
import MDXComponents from '../components/MDXComponents'

export default function Post ({ source, frontmatter }) {
    return <MDXRemote {...source} components={MDXComponents}/>
}

//Para sacar el contendio del post
export async function getStaticProps( {params} ) {
    const {source, frontmatter} = await getFileBySlug(params.slug);

    return {
        props: {source, frontmatter}
    };
}

//Funcion que devuelve todas las rutas
export async function getStaticPaths(){
    const posts = await getFiles();
    const paths = posts.map((post) => ({
        params: {
            slug: post.replace(/\.mdx/,""),
        },
    }));
    return {
        paths,
        fallback: false,
    };
}