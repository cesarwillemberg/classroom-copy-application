import { NextResponse } from "next/server";
import mysql from "mysql2/promise";


interface Turma {
    id: number;
    nameClass: string;
    group: string;
    imagem_id?: number;
    professorName: string;
    profileImage: string | null;
}

export async function GET() {
    let connection: mysql.Connection | null = null;
    try {
        connection = await mysql.createConnection("mysql://nextjs:nextjs@localhost:3306/classroom_copy");

        const [rows]: [any[], any] = await connection.query(`
            SELECT t.*, i.imagem AS profileImage 
            FROM Turmas t
            LEFT JOIN imagens i ON t.imagem_id = i.id
        `);

        if (Array.isArray(rows)) {
            const result: Turma[] = rows.map((turma: Turma) => ({
                ...turma,
                profileImage: turma.profileImage ? Buffer.from(turma.profileImage).toString('base64') : null,
            }));

            await connection.end();
            return NextResponse.json(result);
        } else {
            throw new Error("Resultado inesperado da consulta.");
        }        
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erro ao consultar turmas:", error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            console.error("Erro desconhecido ao consultar turmas:", error);
            return NextResponse.json({ error: 'Erro desconhecido' }, { status: 500 });
        }
    }
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const nameClass = formData.get('nameClass') as string | null;
        const group = formData.get('group') as string | null;
        const professorName = formData.get('professorName') as string | null;
        const imageFile = formData.get('imageProfile') as File | null;

        if (!nameClass || !group || !professorName) {
            return NextResponse.json({ error: 'Campos obrigatórios faltando', created: false });
        }

        let connection: mysql.Connection | null = null;

        try {
            connection = await mysql.createConnection("mysql://nextjs:nextjs@localhost:3306/classroom_copy");

            let imageId: number | null = null;

            if (imageFile) {
                const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
                const [imageResult] = await connection.query(
                    "INSERT INTO imagens (nome, imagem) VALUES (?, ?)",
                    [imageFile.name, imageBuffer]
                );
                imageId = (imageResult as any).insertId;
            }

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