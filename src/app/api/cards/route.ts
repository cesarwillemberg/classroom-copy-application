import { NextResponse } from "next/server";
import mysql from "mysql2/promise";


export async function GET() {
    try {
        const connection = await mysql.createConnection("mysql://nextjs:nextjs@localhost:3306/classroom_copy");

        // Consultar as turmas e as imagens associadas
        const [turmas] = await connection.query(`
            SELECT t.*, i.imagem AS profileImage 
            FROM Turmas t
            LEFT JOIN imagens i ON t.imagem_id = i.id
        `);

        // Converter BLOB para base64
        const result = turmas.map(turma => ({
            ...turma,
            profileImage: turma.profileImage ? turma.profileImage.toString('base64') : null,
        }));

        await connection.end();

        return NextResponse.json(result);
        
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        // Extrai o FormData do request
        const formData = await req.formData();
        
        const nameClass = formData.get('nameClass') as string;
        const group = formData.get('group') as string;
        const professorName = formData.get('professorName') as string;
        const imageFile = formData.get('imageProfile') as File | null;

        // Valida se os campos obrigatórios estão presentes
        if (!nameClass || !group || !professorName) {
            return NextResponse.json({ error: 'Campos obrigatórios faltando', created: false });
        }

        let connection: mysql.Connection | null = null;

        try {
            // Estabelece conexão com o banco de dados
            connection = await mysql.createConnection("mysql://nextjs:nextjs@localhost:3306/classroom_copy");

            let imageId = null;

            // Se houver um arquivo de imagem, armazena a imagem no banco
            if (imageFile) {
                const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
                const [imageResult] = await connection.query(
                    "INSERT INTO imagens (nome, imagem) VALUES (?, ?)",
                    [imageFile.name, imageBuffer]
                );
                imageId = imageResult.insertId;
            }

            // Insere os dados no banco
            const [result] = await connection.query(
                "INSERT INTO turmas (nameClass, grupo, professorName, imagem_id) VALUES (?, ?, ?, ?)",
                [nameClass, group, professorName, imageId]
            );

            console.log("Dados inseridos com sucesso:", result);
            return NextResponse.json({ created: true });
        } catch (error) {
            console.error("Erro ao inserir dados:", error);
            return NextResponse.json({ error: error instanceof Error ? error.message : 'Erro desconhecido', created: false });
        } finally {
            if (connection) {
                await connection.end();
                console.log("Conexão com o banco de dados encerrada.");
            }
        }
    } catch (error) {
        console.error("Erro ao processar o FormData:", error);
        return NextResponse.json({ error: 'Erro ao processar o FormData', created: false });
    }
}